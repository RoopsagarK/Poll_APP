<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Tabs from "./shared/Tabs.svelte"
	import CreatePollForm from "./components/CreatePollForm.svelte";
	import PollList from "./components/PollList.svelte";

	//tabs
	let items = ["Current Polls", "Add New Poll"];
	let activeItem = "Current Polls";
	
    let polls = [
        {
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
    }
];

	const tabChange = (event) => {
		activeItem = event.detail;
	}
	const addNewPoll = (event) => {
		activeItem = "Current Polls";

		let pollDetails = event.detail;
		pollDetails.id = polls.length + 1;
		polls = [pollDetails, ...polls];
	}
	const handleVote = (event) => {
		const {option , id} = event.detail;
		let copiedPolls = [...polls];
		let upVotedPoll = copiedPolls.find((poll) => poll.id === id);

		if(option === 'a'){
			upVotedPoll.votesA += 1;
		}
		
		if(option === 'b'){
			upVotedPoll.votesB += 1;
		}

		polls = copiedPolls;
	};
	const handleDelete = (event) => {
		const id = event.detail;
		polls = polls.filter((poll) => poll.id != id);
	};
</script>

<Header />
<main>
<Tabs  {activeItem} {items} on:tabChange={tabChange}/>
{#if activeItem === "Current Polls"} 
	<PollList {polls} on:vote={handleVote} on:delete={handleDelete}/>
{:else if activeItem === "Add New Poll"}
	<CreatePollForm on:addNewPoll={addNewPoll}/>
	
{/if}
</main>
<Footer/>

<style>
main {
	max-width: 960px;
	margin: 40px auto;
}
</style>