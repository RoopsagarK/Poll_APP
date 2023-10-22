<script>
    import Card from "./Card.svelte";
    import Button from "../shared/Button.svelte";
    import { createEventDispatcher } from "svelte/internal";
    
    const dispatch = createEventDispatcher();
    export let poll;

    //reactive values
    $: totalVotes = poll.votesA + poll.votesB;
    //percentage values
    $: percentageOfA = Math.floor((poll.votesA/totalVotes)*100);
    $: percentageOfB =Math.floor((poll.votesB/totalVotes)*100);

    const handleVote = (option, id) => {
        dispatch('vote', {option: option, id: id});
    };
</script>
<Card>
    <div class="poll">
        <h3>{poll.question}</h3>
        <p> total votes : { totalVotes }</p>
        <div class="answer" on:click={() => handleVote('a', poll.id)}>
            <div class="percent percent-a" style="width: {percentageOfA}%;"></div>
            <span>{poll.answerA} ({poll.votesA})</span>
        </div>
        <div class="answer" on:click={() => handleVote('b', poll.id)}>
            <div class="percent percent-b" style="width: {percentageOfB}%;"></div>
            <span>{poll.answerB} ({poll.votesB})</span>
        </div>
        <div class="deleteButton" on:click={() => dispatch("delete", poll.id)}><Button type="primary">Delete</Button></div>
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