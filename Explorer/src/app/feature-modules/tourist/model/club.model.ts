import { Person } from "../../administration/model/person.model";
import { Achievement } from "./achievement.model";

export interface Club {
  id: number,
  name: string,
  description?: string,
  image?: string,
  ownerId: number,
  owner?: Person,
  fightsWon?: number,
  members?: Person[],
  achievements?: Achievement[],
}
