import { Searchspace, textAlignPhenotype } from "..";

const mountAlignmentSectionSchema = () => [
  /* session */
  { type: Searchspace.Values, values: [0, 1, 2, 3] }, //max-width
  {
    type: Searchspace.Values,
    values: textAlignPhenotype.map((_, i) => i)
  }, //text-align

  /* child */
  { type: Searchspace.Range, from: 5, to: 30 }, //padding
];

export {
  mountAlignmentSectionSchema
}