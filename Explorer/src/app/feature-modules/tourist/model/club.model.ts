import { Profile } from "../../administration/model/profile.model";

export interface Club {
  id: number,
  name: string,
  description?: string,
  image?: string,
  ownerId: number,
  owner?: Profile,
  fightsWon?: number,
  members?: Profile[]
}
