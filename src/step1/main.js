import React from 'react';
import { Row, Col } from 'antd';
import Timer from '../step3/time/timer'
// <–––––––규원----------->
import firebase from 'firebase/app';
import "firebase/database";

import * as model from "./model";
// <--------------------->

import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { drawKeyPoints, drawSkeleton } from './utils';
import * as posenet from '@tensorflow-models/posenet';
import '../step3/threebattle/threebattle.css';

// <–––––––규원----------->
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSa3Vfhsfe6UCuijYr_RoaNb3kzFnwLZM",
  authDomain: "openhackfinal.firebaseapp.com",
  databaseURL: "https://openhackfinal.firebaseio.com",
  projectId: "openhackfinal",
  storageBucket: "",
  messagingSenderId: "113425041146",
  appId: "1:113425041146:web:58106b374a7d6631"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

// <------------------------>

export default class main extends React.Component {

  static defaultProps = {
    videoWidth: 600,
    videoHeight: 700,
    flipHorizontal: false,
    algorithm: 'multi-pose',
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.15,
    minPartConfidence: 0.1,
    nmsRadius: 30.0,
    maxPoseDetections: 5,
    outputStride: 16,
    imageScaleFactor: 0.5,
    skeletonColor: '#BBB',
    skeletonLineWidth: 6,
    loadingText: 'Loading...please be patient...'
  }

  constructor(props) {
    super(props, main.defaultProps)
  }

  getCanvas = elem => {
    this.canvas = elem
  }

  getVideo = elem => {
    this.video = elem
  }



  async componentDidMount() {
    try {
      await this.setupCamera()
    } catch (error) {
      throw new Error(
        'This browser does not support video capture, or this device does not have a camera'
      )
    }

    try {
      this.posenet = await posenet.load({
        architecture: 'ResNet50',
        outputStride: 32,
        inputResolution: 257,
        quantBytes: 2
      });
    } catch (error) {
      throw new Error('PoseNet failed to load')
    } finally {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 200)
    }

    this.detectPose()

    this.detectPose()
    if(model.userPP == "p1"){
      this.drawPose("p2", "canvas1"); //플레이어 아이디, 캔버스 el id
      this.drawPose("p3", "canvas2"); //플레이어 아이디, 캔버스 el id
      console.log("p1");
    }
    else if (model.userPP == "p2") {
      this.drawPose("p1", "canvas1"); //플레이어 아이디, 캔버스 el id
      this.drawPose("p3", "canvas2"); //플레이어 아이디, 캔버스 el id
      console.log("p2");
    }
    else {
      this.drawPose("p1", "canvas1"); //플레이어 아이디, 캔버스 el id
      this.drawPose("p2", "canvas2"); //플레이어 아이디, 캔버스 el id
      console.log("p3");
    }
  }

  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available'
      )
    }
    const { videoWidth, videoHeight } = this.props
    const video = this.video
    video.width = videoWidth
    video.height = videoHeight

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: videoWidth,
        height: videoHeight
      }
    })

    video.srcObject = stream

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play()
        resolve(video)
      }
    })
  }

  detectPose() {
    const { videoWidth, videoHeight } = this.props;
    const canvas = this.canvas;
    const canvasContext = canvas.getContext('2d');

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    this.poseDetectionFrame(canvasContext)
  }

  poseDetectionFrame(canvasContext) {
    const {
      algorithm,
      imageScaleFactor,
      flipHorizontal,
      outputStride,
      minPoseConfidence,
      minPartConfidence,
      maxPoseDetections,
      nmsRadius,
      videoWidth,
      videoHeight,
      showVideo,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth
    } = this.props

    const posenetModel = this.posenet
    const video = this.video

    const findPoseDetectionFrame = async () => {
      let poses = []

      switch (algorithm) {
        case 'multi-pose': {
          poses = await posenetModel.estimateMultiplePoses(
            video,
            imageScaleFactor,
            flipHorizontal,
            outputStride,
            maxPoseDetections,
            minPartConfidence,
            nmsRadius
          )
          break
        }
        case 'single-pose': {
          const pose = await posenetModel.estimateSinglePose(
            video,
            imageScaleFactor,
            flipHorizontal,
            outputStride
          )
          poses.push(pose)
          break
        }
        default:
          break;
      }

      model.checkOnline(poses).then((status) => {
        //console.log(status);
      });


      canvasContext.clearRect(0, 0, videoWidth, videoHeight)

      if (showVideo) {
        var scale = 0.5;
        // canvasContext.save();
        // canvasContext.scale(-scale, scale);
        // canvasContext.translate(-videoWidth, 0);
        canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight);
        // canvasContext.restore();
      }

      // <-----규원 구현 : db 연결 파트 ----->
      const dataRef = "poses/"+model.userPP;
      database.ref(dataRef).set(poses);

      model.ready.check(poses, model.userPP);
      model.sensor.isSit(model.ready.avg_distance, poses, model.userPP);

      model.ready.load();
      // <------------------------------>

      poses.forEach(({ score, keypoints }) => {
        if (score >= minPoseConfidence) {
          if (showPoints) {
            drawKeyPoints(
              keypoints,
              minPartConfidence,
              skeletonColor,
              canvasContext
            )
          }
          if (showSkeleton) {
            drawSkeleton(
              keypoints,
              minPartConfidence,
              skeletonColor,
              skeletonLineWidth,
              canvasContext
            )
          }
        }
      })
      requestAnimationFrame(findPoseDetectionFrame)
    }
    findPoseDetectionFrame()
  }


  // 규원 구현 파트 : 카메라 없이 그냥 poses 받은것을 컴포넌트에 그려줌
  drawPose(player, canvasId) {
    const { videoWidth, videoHeight } = this.props;
    const canvas = document.getElementById(canvasId);;
    const canvasContext = canvas.getContext('2d');
    const dataRef = "poses/" + player // 어디 객체에서 찾을 것인지

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    database.ref(dataRef).on("value", snap => {
      let poses = snap.val();
      if (!poses) {
        return;
      }
      if (!poses[0]) {
        return;
      }
      this.poseDrawFrame(canvasContext, poses) // 여기서 받는 콘텍스트에 poses 받은걸 그립니다.
    });

  }

  poseDrawFrame(canvasContext, poses) {
    // 예외처리: pose가 정의되지 않았다면, poses에 사람이 한명도 없다면 함수 즉시 종료
    if (!poses || !poses[0]) {
      return;
    }

    const {
      minPoseConfidence,
      minPartConfidence,
      videoWidth,
      videoHeight,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth
    } = this.props

    const findPoseDrawFrame = async () => {

      canvasContext.clearRect(0, 0, videoWidth, videoHeight)

      if(!poses || !poses[0]) {
        return;
      }
      
      poses.forEach(({ score, keypoints }) => {
        if (score >= minPoseConfidence) {
          if (showPoints) {
            drawKeyPoints(
              keypoints,
              minPartConfidence,
              skeletonColor,
              canvasContext
            )
          }
          if (showSkeleton) {
            drawSkeleton(
              keypoints,
              minPartConfidence,
              skeletonColor,
              skeletonLineWidth,
              canvasContext
            )
          }
        }
      })
    }
    findPoseDrawFrame()
  }

  getStartTiming() {

  }

  render() {
    return (
      <>
        <div>
          <div>
            <div>
              <Col span={8} style={{ textAlign: "center", paddingBottom: "99.2%", backgroundColor: "#ffffff", overflow: "hidden" }} >
                <div>
                  <canvas id="canvas1" width="500" height="300" style={{ border: "5px solid" }} />
                  {/* <p className='s' style={{ left: 300, top: 1 }}><Timer /></p> */}
                  <p className='sss' style={{ paddingLeft: 90, paddingRight: 90, position: 'absolute', right: '250px', top: '8%' }}>'  SQUAT  SQUAT  SQUAT  '</p>
                  <p className='bottomN' style={{}}>22</p>
                  <div style={{ position: 'absolute', paddingRight: '170px', bottom: '60.5%', left: 70, border: '2px solid' }}></div>
                  <p className='kcal' style={{ position: 'absolute', top: '36%', right: 70 }}>0.234kcal</p>
                  <div style={{ position: 'absolute', paddingLeft: '380px', bottom: '60.5%', right: 70, border: '2px solid' }}></div>
                  <p className='counts'>COUNTS</p>
                  <p className='burned'>Burned</p>
                  <p className='bottomid' style={{}}>USER 12345</p>
                </div>
              </Col>
            </div>
            <div>
              <Col className='backgra' span={8} style={{ paddingBottom: "99.2%", overflow: "hidden", fontWeight: 500 }} >
                <video id="videoNoShow" playsInline ref={this.getVideo} />
                <canvas className="webcam" ref={this.getCanvas} />
                <p className='bottomN' style={{}}>22</p>
                <div style={{ position: 'absolute', paddingRight: '170px', bottom: '60.5%', left: 70, border: '2px solid' }}></div>
                <p className='counts'>COUNTS</p>
                <p className='bottomid' style={{}}>USER 12345</p>
              </Col>
            </div>
            <div>
              <Col className='backgrb' span={8} style={{ paddingBottom: "99.2%", overflow: "hidden", fontWeight: 500 }} >
                <canvas id="canvas2" />
                <p className='bottomN' style={{}}>22</p>
                <div style={{ position: 'absolute', paddingRight: '170px', bottom: '60.5%', left: 70, border: '2px solid' }}></div>
                <p className='counts'>COUNTS</p>
                <p className='bottomid' style={{}}>USER 12345</p>
              </Col>
            </div>
          </div>
        </div>
      </>
    );
  }
}