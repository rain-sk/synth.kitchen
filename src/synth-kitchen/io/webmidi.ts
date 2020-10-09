import webmidi from 'webmidi';

webmidi.enable(function (err: string) {
    if (!err) {
        // cry about it
    }
});

export default webmidi;