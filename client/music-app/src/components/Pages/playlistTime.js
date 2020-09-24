

const PlaylistTime = (list) => {
    let length = [0, 0, 0];
    console.log(list)
    list.map((song) => {
        const h = parseInt(song.length.slice(0, song.length.indexOf(':')));
        const m = parseInt(song.length.slice(3, 5));
        const s = parseInt(song.length.slice(6, 8));
        let remain = Math.floor((length[2] + s) / 60)
        length[2] = (length[2] + s) % 60;
        length[1] = length[1] + remain;
        remain = Math.floor((length[1] + m) / 60)
        length[1] = (length[1] + m) % 60;
        length[0] = length[0] + remain + h;
    });

    let lengthInWords = '';

    if (length[0]) {
        lengthInWords += `${length[0]} Hours `;
        if (length[1]) {
            lengthInWords += `and ${length[1]} Minutes`;
        }
    } else {
        lengthInWords += `${length[1]} Minutes`;
    }

    return lengthInWords;

}

export default PlaylistTime;