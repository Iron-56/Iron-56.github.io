
sounds = {}

function add(key, s)
{
	sounds[key] = `sounds/${s}.mp3`;
}

function load()
{
	add("W", "crash");
	add("A", "kick-bass");
	add("S", "snare");
	add("D", "tom-1");
	add("J", "tom-2");
	add("K", "tom-3");
	add("L", "tom-4");
}

function addListeners()
{
	let buttons = document.querySelector(".set");
	for(let i = 0; i < buttons.children.length; i++)
	{
		buttons.children[i].play = function()
		{
			let audio = new Audio(sounds[this.innerHTML]);
			audio.play();
			this.classList.add("pressed");

			setTimeout(() => {
				this.classList.remove("pressed");
			}, 500);
		}

		buttons.children[i].addEventListener("click", function()
		{
			this.play();
		});
	}

	document.addEventListener("keydown", function(e)
	{
		if(e.key.toUpperCase() in sounds)
		{
			document.getElementsByClassName(e.key)[0].play();
		}
	});
}

function main()
{
	load();
	addListeners();
}



main();