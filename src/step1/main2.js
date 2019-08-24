import React from 'react';

// <–––––––규원----------->
import firebase from 'firebase/app';
import "firebase/database";
// <--------------------->

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { drawKeyPoints, drawSkeleton } from './utils';

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
    videoWidth: 1600,
    videoHeight: 1000,
    flipHorizontal: true,
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
    skeletonColor: '#FFF',
    skeletonLineWidth: 6,
    loadingText: 'Loading...please be patient...'
  }

  constructor(props) {
    super(props, App.defaultProps)
  }

  getCanvas = elem => {
    this.canvas = elem
  }

  getVideo = elem => {
    this.video = elem
  }

  async componentDidMount() {
    this.drawPose()
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

  // 규원 구현 파트 : 카메라 없이 그냥 poses 받은것을 컴포넌트에 그려줌
  drawPose() {
    const { videoWidth, videoHeight } = this.props;
    const canvas = this.canvas;
    const canvasContext = canvas.getContext('2d');
    const dataRef = "bat" // 어디 객체에서 찾을 것인지

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    database.ref(dataRef).on("value", snap => {
      let poses = snap.val();
      if(!poses) {
        return;
      }
      if(!poses[0]) {
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

  render() {
    return (
      <>
        {/* {memo.p2}  */}
        <div>
          <div>
            {/* <video id="videoNoShow" playsInline ref={this.getVideo} /> */}
            <canvas ref={this.getCanvas} />
            <canvas id="canvas1" />
            <canvas id="canvas2" />
          </div>
        </div>
      </>
    );
  }
}