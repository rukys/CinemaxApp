import { create } from 'twrnc';

// tailwind.config.js stays CommonJS because twrnc reads it as a plain config.
const tw = create(require('./tailwind.config'));

export default tw;
