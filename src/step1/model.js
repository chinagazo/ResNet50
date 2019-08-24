
import firebase from 'firebase/app';
import "firebase/database";

let database
setTimeout(() => {
    database = firebase.database();
}, 2000);


// 현재 나의 포즈 저장
export let curPoses = [];

let readyCount = 0; // 연속 10번이상 준비상태에 만족해야 true 를 리턴
export function isReady(poses) {
    let l_shoulder_sc = poses[0].keypoints[5].score;
    let r_shoulder_sc = poses[0].keypoints[6].score;
    let l_ankle_sc = poses[0].keypoints[15].score;
    let r_ankle_sc = poses[0].keypoints[16].score;

    let status = new Boolean;

    if (l_ankle_sc > 0.3 && r_ankle_sc > 0.3 && l_shoulder_sc > 0.25 && r_shoulder_sc > 0.25) {
        if (readyCount < 11) { // 11번 이상 준비상태면
            status = false;
        }
        else {
            status = true;
        }
        readyCount += 1;
        return status;
    }
    else { // 한번이라도 준비상태가 아니면
        readyCount = 0;

        return false;
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

        if (lastPoses === []) {
            lastPoses = curPoses;
            resolve(status);
        }

        // case by
        for (let i = 1; i <= 3; i++) {
            if (lastPoses['p' + i] === curPoses['p' + i]) { // 움직임없을때
                if (stopCount['p' + i] > 20) { // 20번동안 움직임 없으면 연결 끊김 간주
                    status['p' + i] = false;
                }
                stopCount['p' + i] += 1; // 20번 이전까진 count만 추가
            }
            else {
                status['p' + i] = true;
                stopCount['p' + i] = 0;
            }
        }
        resolve(status);
    });
};