function waltz(key, indices) {
    const sBox = Array.from({ length: 256 }, (_, i) => i);

    for (let i = 0; i < 256; i++) {
        const rho = Math.floor(((i + 1) * (i + 2)) / 2) % 256;

        [sBox[i], sBox[rho]] = [sBox[rho], sBox[i]];
    }

    let count = 0;

    for (let i = 0; i < 768; i++) {
        const cycle = i % 256;

        count = (count + sBox[cycle] + key[cycle % key.length]) % 256;
        [sBox[cycle], sBox[count]] = [sBox[count], sBox[cycle]];
    }

    const result = [];
    let s = 0;
    let t = 0;
    let p = 0;
    let q = 0;

    for (let i = 0; i < indices.length; i++) {
        s = (s + 1) % 256;
        t = (p + sBox[(t + sBox[s]) % 256]) % 256;
        p = (p + s + sBox[s]) % 256;
        [sBox[s], sBox[t]] = [sBox[t], sBox[s]];
        q = sBox[(t + sBox[(s + sBox[(q + p) % 256]) % 256]) % 256];

        result.push(indices[i] ^ q);
    }

    return result;
}