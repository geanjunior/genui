import { Searchspace, textAlignPhenotype } from "..";

const mountSectionSchema = () => [
  { type: Searchspace.Values, values: [0, 1] }, //variation - (0 = alignment-session, 1 = flexbox-section)
  { type: Searchspace.Values, values: [1, 2] }, //colums
  { type: Searchspace.Values, values: [0, 1, 2, 3] }, //max-width

  /* row */
  { type: Searchspace.Range, from: 0, to: textAlignPhenotype.length - 1 }, //text-align
  { type: Searchspace.Values, values: [0, 1] }, //flex-direction
  { type: Searchspace.Values, values: [0, 1, 2, 3] }, //align-items

  /* child */
  { type: Searchspace.Values, values: [2, 3] }, //flex-direction
  { type: Searchspace.Range, from: 5, to: 30 }, //padding
];

export {
  mountSectionSchema
}