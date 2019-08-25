
import firebase from 'firebase/app';
import "firebase/database";
import React, { Component } from 'react';
import Main from './main';

let database
setTimeout(() => {
    database = firebase.database();
}, 2000);


// 현재 나의 포즈 저장
export let curPoses = [];

  //*******이것이 유저 선택 코드 ***********/x
export const userPP = "p1";

export default class MainModel extends Component{

    render(){
        // 
        const userPP_ = "p1";
        let userCanvas = {};
        if(userPP_ == "p1") {
            userCanvas.userPP = userPP_;
            userCanvas.canvas1 = "p2";
            userCanvas.canvas2 = "p3";
        }
        else if(userPP_ == "p2") {
            userCanvas.userPP = userPP_;
            userCanvas.canvas1 = "p1";
            userCanvas.canvas2 = "p3";
        }
        else {
            userCanvas.userPP = userPP_;
            userCanvas.canvas1 = "p1";
            userCanvas.canvas2 = "p2";
        }
        console.log(userCanvas);
        return(
            <>
            {score.amount}
            </>
        );
    }
}


export let ready = {
    readyCount: 0, // 연속 15번이상 준비상태에 만족해야 true 를 리턴
    avg_distance: new Number(),

    // ready.check
    // * 준비상태를 db에 기록
    // * 준비완료시 그 자세를 기록해 (어깨부터 발까지 거리) 나중에 스쿼트 판정 잣대로 만듬.
    // * 단 앞에 예외처리를 해서 게임이 시작되면 이 함수가 더이상 실행되지 않도록 해야 함.
    // * 안 그러면 판정 잣대가 계속 바뀜.
    check: async function (poses, player) {
        if (!poses || !player) {
            this.readyCount = 0;
            this.avg_distance = 0;
            return;
        }
        if (!poses[0]) {
            this.readyCount = 0;
            this.avg_distance = 0;
            return;
        }

        let l_shoulder = poses[0].keypoints[5];
        let r_shoulder = poses[0].keypoints[6];
        let l_ankle = poses[0].keypoints[15];
        let r_ankle = poses[0].keypoints[16];

        let status = new Boolean();

        if (l_ankle.score > 0.3 && r_ankle.score > 0.3 && l_shoulder.score > 0.25 && r_shoulder.score > 0.25) {
            if (this.readyCount < 10) { // 10번 이하로 연속 준비면 준비 false 상태 유지
                status = false;
            }
            else if (this.readyCount < 15) { // 10번부터 15번까지 어깨와 발까지의 거리의 평균을 구함.
                status = false; // false 상태 유지
                let distance = (l_ankle.position.y + r_ankle.position.y) / 2.0 - (l_shoulder.position.y + r_shoulder.position.y) / 2.0;
                this.avg_distance += distance / 5.0;
            }
            else {
                status = true;
            }
            this.readyCount += 1;
        }
        else { // 한번이라도 준비상태가 아니면
            this.readyCount = 0;
            this.avg_distance = 0;
            status = false;
            // 카운트 초기화
            score.reset(userPP);

        }
        await database.ref('ready/' + player).set(status);
    },
    status: {
        p1: false,
        p2: false,
        p3: false,
    },
    load: function () {
        database.ref("ready").on("value", snap => {
            this.status = snap.val();
        });
    }
}


let stopCount = {
    p1: 0,
    p2: 0,
    p3: 0
};
let lastPoses = [];
export async function checkOnline() {

    let status = { // promise return object
        p1: false,
        p2: false,
        p3: false
    }

    return new Promise(async (resolve, reject) => {
        let snap = await database.ref("poses").once("value");
        let curPoses = snap.val();

        if(!curPoses || !curPoses[0]) {
            resolve(status);
        }

        if (lastPoses === []) {
            lastPoses = curPoses;
            resolve(status);
            return;
        }

        // case by
        for (let i = 1; i <= 1; i++) {
            // 예외처리
            if(lastPoses['p'+i] === [] && curPoses === []) {
                continue;
            }
            if (lastPoses['p' + i] === curPoses['p' + i]) { // 움직임없을때
                if (stopCount['p' + i] > 20) { // 20번동안 움직임 없으면 연결 끊김 간주
                    status['p' + i] = false; // 상태는 끊김
                    score.amount['p' + i] = 0; // 로컬의 점수를 0점으로 바꿈, 만약 다시 접속해서 카운트 되면 다시 점수 살아남
                }
                stopCount['p' + i] += 1; // 20번 이전까진 count만 추가
            }
            else {
                status['p' + i] = true;
                stopCount['p' + i] = 0;
            }
        }
        // 여기 움직임 없는것은 정지시킴
        resolve(status);
    });
}





export let score = {
    amount: {
        p1: 0,
        p2: 0,
        p3: 0
    },
    load: function () {
        firebase.database.ref('score').on('value', (snap) => {
            this.mount = snap.val();
        });
    },
    upCount: function (player) { // player에는 p1, p2, p3 들어감
        database.ref('score/' + player).transaction((amount) => {
            return amount + 1;
        });
    },
    reset: function (player) {
        database.ref('score/' + player).transaction(() => {
            return 0;
        });
    }
}

export let sensor = {
    lastStatus: true,
    isSit: function (distance, poses, player) { // distance는 model.ready.avg_distance
        if(!distance || distance === 0) {
            return;
        }
        if(!poses || !poses[0]) {
            return;
        }

        // 키포인트 뽑아내기
        let l_shoulder = poses[0].keypoints[5];
        let r_shoulder = poses[0].keypoints[6];
        let l_ankle = poses[0].keypoints[15];
        let r_ankle = poses[0].keypoints[16];
        
        let cur_distance = (l_ankle.position.y + r_ankle.position.y) / 2.0 - (l_shoulder.position.y + r_shoulder.position.y) / 2.0;
        let curStatus;
        if(cur_distance < distance*2.0 / 3.0) { // 현재 앉아 있는 상태 (유효하므로 true)
            curStatus  = true;
            if(this.lastStatus) { // 전에도 않아있었다면
                // do nothing
            }
            else { // 서있었다면
                // do nothing
            }
            this.lastStatus = true;
        }
        else { // 일어난 상태
            curStatus = false;
            if(this.lastStatus) { // 전에 앉아있었다면
                score.upCount(player);
            }
            else { // 서있었다면
                // do nothing
            }
            this.lastStatus = false;
        }
        // 
    }
    
};