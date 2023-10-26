<script>
    import PollStore from "../stores/PollStore";
    import { createEventDispatcher } from "svelte/internal";
    import Button from "../shared/Button.svelte";

    const dispatch = createEventDispatcher();
    let fields = { question: "", answerA: "", answerB: ""};
    let errors = { question: "", answerA: "", answerB: ""};
    let valid = false;


    const submitHandler = () => {
        valid = true;
        //Validate the Question
        if(fields.question.trim().length < 5) {
            valid = false;
            errors.question = "Question must be atleast 5 characters long";
        } else {
            errors.question = "";
        }

        //Validate the Answer A
        if(fields.answerA.trim().length < 1) {
            valid = false;
            errors.answerA = "Answer must be atleast 5 characters long";
        } else {
            errors.answerA = "";
        }

        //Validate the Answer B
        if(fields.answerB.trim().length < 1) {
            valid = false;
            errors.answerB = "Answer must be atleast 5 characters long";
        } else {
            errors.answerB = "";
        }

        if(valid) {
            //save poll to store
            PollStore.update((currentPoll) => {
                let poll = {...fields, votesA: 0, votesB: 0, id: currentPoll.length + 1};
                return [poll, ...currentPoll];
            });
            dispatch("add");
        }

    }

  
</script>

<form on:submit|preventDefault={submitHandler}>
    <div class="form-field">
        <label for="question">Poll Question: </label>
        <input type="text" name="question" id="question" bind:value={fields.question}>
        <div class="error">{errors.question}</div>
    </div>
    <div class="form-field">
        <label for="answer-a">Answer A:</label>
        <input type="text" name="answer-a" id="answer-a" bind:value={fields.answerA}>
        <div class="error">{errors.answerA}</div>
    </div>
    <div class="form-field">
        <label for="answer-b">Answer B:</label>
        <input type="text" name="answer-b" id="answer-b" bind:value={fields.answerB}>
        <div class="error">{errors.answerB}</div>
    </div>
    <Button type="secondary" >Add Poll</Button>
</form>

<style>
    form {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }

    .form-field {
        margin: 18px auto;

    }

    input {
        width: 100%;
        border-radius: 6px;
    }

    label {
        margin: 10px auto;
        text-align: left;
    }

    .error {
        font-weight: bold;
        color: #d91b42;
        font-size: 12px;
    }
</style>