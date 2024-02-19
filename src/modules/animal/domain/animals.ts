import { WatchedList } from "@shared/domain/WatchedList";
import { Animal } from "./animal";

export class Animals extends WatchedList<Animal> {

  private constructor(animal: Animal[]) {
    super(animal)
  }

  public compareItems(a: Animal, b: Animal): boolean {
    return a.equals(b)
  }

  public static create(animal?: Animal[]): Animals {
    return new Animals(animal ? animal : []);
  }

}