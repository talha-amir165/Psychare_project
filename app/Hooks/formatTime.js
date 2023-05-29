export function formatTimes(time) {
    let hour = parseInt(time.split(':')[0]);
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    let formattedTime = hour + ':' + time.split(':')[1] + ' ' + ampm;
    return formattedTime;
}