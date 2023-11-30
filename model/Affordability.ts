export type Affordability = {
  isAffordable: boolean
  isComfortablyAffordable: boolean
  missingAffordability?: number // Amount missing if not affordable
  recommendedAdditionalAffordability?: number // Recommended additional amount if not comfortably affordable
}
