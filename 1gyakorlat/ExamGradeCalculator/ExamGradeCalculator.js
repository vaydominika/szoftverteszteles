function calculateGrade(theory, practice) {
    if (!Number.isFinite(theory) || !Number.isFinite(practice) || theory < 0 || theory > 60 || practice < 0 || practice > 40) {
        throw new RangeError('Invalid score');
    }
    if (theory < 30 || practice < 20) return 1;
    const total = theory + practice;
    return total < 50 ? 1 : total < 60 ? 2 : total < 70 ? 3 : total < 85 ? 4 : 5;
}
