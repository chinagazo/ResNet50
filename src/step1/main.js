import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { drawKeyPoints, drawSkeleton } from './utils';
import * as posenet from '@tensorflow-models/posenet'
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

      canvasContext.clearRect(0, 0, videoWidth, videoHeight)

      if (showVideo) {

        canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
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
      requestAnimationFrame(findPoseDetectionFrame)
    }
    findPoseDetectionFrame()
  }


  // 규원 구현 파트 : 카메라 없이 그냥 poses 받은것을 컴포넌트에 그려줌
  drawPose() {
    const { videoWidth, videoHeight } = this.props;
    const canvas = this.canvas;
    const canvasContext = canvas.getContext('2d');

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // 여기서 firebase database 이벤트 리스너 생성하고 콜백으로 아래의 함수를 실행시킨다.
    let gotPoses = [] // 이건 가상으로 설정해 놓은 변수
    this.poseDrawFrame(canvasContext, gotPoses) // 여기서 받는 콘텍스트에 poses 받은걸 그립니다.
  }

  poseDrawFrame(canvasContext, poses) {
    // 예외처리: pose가 정의되지 않았다면, poses에 사람이 한명도 없다면 함수 즉시 종료
    if(!poses || !poses[0]) {
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
        <Navbar bg="light" variant="light" className="justify-content-between">
          <Navbar.Text></Navbar.Text>
          <Navbar.Brand href="#home">PUMPETITION</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link href="#about">ABOUT</Nav.Link>
            {/* <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Navbar.Collapse>
          {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary">Search</Button>
                    </Form> */}
        </Navbar>
        {/* {memo.p2}  */}
        <div>
          <div>
            <video id="videoNoShow" playsInline ref={this.getVideo} />
            <canvas className="webcam" ref={this.getCanvas} />
            <canvas id="canvas1" />
            <canvas id="canvas2" />
          </div>
        </div>
      </>
    );
  }
}