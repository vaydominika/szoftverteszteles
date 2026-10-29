function calculateParkingFee(minutes, isWeekend, isVip) {
    if (!Number.isFinite(minutes) || minutes < 0) throw new RangeError('Invalid parking time');
    if (minutes <= 15) return 0;
    let fee = Math.min(Math.ceil(minutes / 60) * 600, 5000);
    if (isWeekend) fee *= 0.5;
    if (isVip) fee *= 0.8;
    return fee;
}
