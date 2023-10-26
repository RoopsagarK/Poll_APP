<script>
    import Card from "./Card.svelte";
    import { tweened } from "svelte/motion"
    import PollStore from "../stores/PollStore";
    import Button from "../shared/Button.svelte";
    
    export let poll;

    //reactive values
    $: totalVotes = poll.votesA + poll.votesB;
    //percentage values
    $: percentageOfA = Math.floor((poll.votesA/totalVotes)*100) || 0;
    $: percentageOfB =Math.floor((poll.votesB/totalVotes)*100) || 0;

    // tweened percentage
    const tweenedA = tweened(0);
    const tweenedB = tweened(0);
    $: tweenedA.set(percentageOfA);
    $: tweenedB.set(percentageOfB);

    const handleVote = (option, id) => {
        PollStore.update((currentPolls) => {
            let copiedPolls = [...currentPolls];
            let upVotedPoll = copiedPolls.find((poll) => poll.id === id);

            if(option === 'a'){
                upVotedPoll.votesA += 1;
            }
            
            if(option === 'b'){
                upVotedPoll.votesB += 1;
            }

            return copiedPolls;
        });
    };

    const handleDelete = (id) => {
        PollStore.update((currentPolls) => {
            return currentPolls.filter((poll) => poll.id != id);
        });
    };
</script>
<Card>
    <div class="poll">
        <h3>{poll.question}</h3>
        <p> total votes : { totalVotes }</p>
        <div class="answer" on:click={() => handleVote('a', poll.id)}>
            <div class="percent percent-a" style="width: {$tweenedA}%;"></div>
            <span>{poll.answerA} ({poll.votesA})</span>
        </div>
        <div class="answer" on:click={() => handleVote('b', poll.id)}>
            <div class="percent percent-b" style="width: {$tweenedB}%;"></div>
            <span>{poll.answerB} ({poll.votesB})</span>
        </div>
        <div class="deleteButton"><Button type="primary"on:click={() => handleDelete(poll.id)}>Delete</Button></div>
    </div>
</Card>

<style>
    h3{
        margin: 0 auto;
        color: #555;
    }
    p {
        margin-top: 6px;
        font-size: 14px;
        color: #aaa;
        margin-bottom: 30px;
    }
    .answer {
        background: #fafafa;
        cursor: pointer;
        margin: 10px auto;
        position: relative;
    }
    .answer:hover {
        opacity: 0.6;
    }
    span {
        display: inline-block;
        padding: 10px 20px;
    }
    .percent {
        height: 100%;
        position: absolute;
        box-sizing: border-box;
    }
    .percent-a {
        background: rgba(217, 27, 66, 0.2);
        border-left: 4px solid #d91b42;
    }
    .percent-b {
        background: rgba(69, 196, 150, 0.2);
        border-left: 4px solid #45c496;
    }
    .deleteButton {
        margin-top: 30px;
        text-align: center;
    }
</style>