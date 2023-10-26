import { writable } from "svelte/store";

const PollStore = writable( [{
    question: "What is the name of Hinata's visual power ?",
    answerA: "Byakugan",
    answerB: "Sharingan",
    votesA: 8,
    votesB: 3,
    id: 1
},
{
    question: "What is the name of Uchihha's visual power ?",
    answerA: "Byakugan",
    answerB: "Sharingan",
    votesA: 3,
    votesB: 9,
    id: 2
},
{
    question: "Who among the following is Medical Ninja ?",
    answerA: "Sakura",
    answerB: "Tamari",
    votesA: 8,
    votesB: 3,
    id: 3
}]);

export default PollStore;