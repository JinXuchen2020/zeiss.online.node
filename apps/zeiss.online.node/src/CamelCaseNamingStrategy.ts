import { DefaultNamingStrategy, NamingStrategyInterface, Table, View } from "typeorm";

export class CamelCaseNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    if (customName) {
      return customName;
    }
    const name = propertyName;
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}