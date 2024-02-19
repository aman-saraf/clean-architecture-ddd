import { AggregateRoot } from "../AggregateRoot";
import { UniqueEntityId } from "../UniqueEntityId";
import { IDomainEvent } from "./IDomainEvent";

interface HandlersMap {
  [index: string]: any
}

export class DomainEvents {

  private static handlersMap: HandlersMap = {}
  private static markedAggregates: AggregateRoot<any>[] = [];


  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateById(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) => this.dispatch(event));
  }

  private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }


  private static findMarkedAggregateById(id: UniqueEntityId): AggregateRoot<any> | undefined {
    return this.markedAggregates.find(aggregate => aggregate.id.equals(id))
  }

  public static dispatchEventsForAggregate(id: UniqueEntityId): void {
    const aggregate = this.findMarkedAggregateById(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static register(callback: (event: IDomainEvent) => void, eventClassName: string): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];

  }
  private static dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (let handler of handlers) {
        handler(event);
      }
    }
  }

}