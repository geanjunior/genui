import { Searchspace, textAlignPhenotype } from "..";

const mountAlignmentSectionSchema = () => [
  /* session */
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