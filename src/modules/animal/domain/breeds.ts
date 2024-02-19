import { WatchedList } from "@shared/domain/WatchedList";
import { Breed } from "./breed";

export class Breeds extends WatchedList<Breed> {

  private constructor(breed: Breed[]) {
    super(breed)
  }

  public compareItems(a: Breed, b: Breed): boolean {
    return a.equals(b)
  }

  public static create(breed?: Breed[]): Breeds {
    return new Breeds(breed ? breed : []);
  }

}