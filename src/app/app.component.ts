import { Component, OnInit } from '@angular/core';

class ComputerScienceModules {
  
  constructor(public _name?: string,
    public semester?: "WS" | "SS" | "",
    public cp?: number,
    public isSelected?: boolean,
    public mark?: number) {
  }
}

enum MainFocus {
  dataAnalytics,
  scientificComputing,
  computerEngineering
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Master Informatik Planner';
  moduleCoreTopics: ComputerScienceModules[];
  moduleDataAnalytics: ComputerScienceModules[];
  moduleScientificComputing: ComputerScienceModules[];
  moduleComputerEngineering: ComputerScienceModules[];
  moduleInterdisiplinary: ComputerScienceModules[];
  moduleAdditional: ComputerScienceModules[];
  moduleMasterThesis: ComputerScienceModules;
  _mainFocus: MainFocus;

  ngOnInit() {
    this.moduleCoreTopics = [
      new ComputerScienceModules("Spezielle Kapitel der Praktischen Informatik", "", 9, false, 0),
      new ComputerScienceModules("Spezielle Kapitel der Theoretischen Informatik", "", 9, false, 0),
      new ComputerScienceModules("Spezielle Kapitel der Technischen Informatik", "", 9, false, 0),
      new ComputerScienceModules("Digitale Transformation", "WS", 6, false, 0),
    ];
  }

  setMainFocus(num: number) {
    this._mainFocus = num;
  }

  calculateWP(): number {
    let value = 0;
    for (const i of this.moduleCoreTopics) {
      value += i.isSelected ? i.cp : 0;
    }
    for (const i of this.moduleDataAnalytics) {
      value += i.isSelected ? i.cp : 0;
    }
    for (const i of this.moduleScientificComputing) {
      value += i.isSelected ? i.cp : 0;
    }
    for (const i of this.moduleComputerEngineering) {
      value += i.isSelected ? i.cp : 0;
    }
    for (const i of this.moduleInterdisiplinary) {
      value += i.isSelected ? i.cp : 0;
    }
    for (const i of this.moduleAdditional) {
      value += i.isSelected ? i.cp : 0;
    }
      value += this.moduleMasterThesis.isSelected ? this.moduleMasterThesis.cp : 0;
    return value;
  }

  toLessWPDataAnalytics(): boolean {
    let value = 0;
    let value2 = 0;
    let value3 = 0;
    this.moduleDataAnalytics.forEach(m => value += m.isSelected ? m.cp : 0);
    this.moduleScientificComputing.forEach(m => value2 += m.isSelected ? m.cp : 0);
    this.moduleComputerEngineering.forEach(m => value3 += m.isSelected ? m.cp : 0);
    return this._mainFocus === 0 ? value >= 39 : 
      value + (this._mainFocus === 1 ? value2 : value3) > 18;
  }
  toLessWPScientificComputing(): boolean {
    let value = 0;
    let value2 = 0;
    let value3 = 0;
    this.moduleDataAnalytics.forEach(m => value += m.isSelected ? m.cp : 0);
    this.moduleScientificComputing.forEach(m => value2 += m.isSelected ? m.cp : 0);
    this.moduleComputerEngineering.forEach(m => value3 += m.isSelected ? m.cp : 0);
    return this._mainFocus === 1 ? value2 >= 39 : 
      value2 + (this._mainFocus === 0 ? value : value3) > 18;
  }
  toLessWPComputerEngineering(): boolean {
    let value = 0;
    let value2 = 0;
    let value3 = 0;
    this.moduleDataAnalytics.forEach(m => value += m.isSelected ? m.cp : 0);
    this.moduleScientificComputing.forEach(m => value2 += m.isSelected ? m.cp : 0);
    this.moduleComputerEngineering.forEach(m => value3 += m.isSelected ? m.cp : 0);
    return this._mainFocus === 2 ? value3 >= 39 : 
      value3 + (this._mainFocus === 1 ? value2 : value) > 18;
  }
  toLessWPInterdisiplinary(): boolean {
    let value = 0;
    this.moduleInterdisiplinary.forEach(m => value += m.isSelected ? m.cp : 0);
    return value >= 9;
  }
  toLessWPAdditional(): boolean {
    let value = 0;
    this.moduleAdditional.forEach(m => value += m.isSelected ? m.cp : 0);
    return value >= 6;
  }

  isSeminarSelected(main: MainFocus): boolean {
    let selected = false;
    if (main = MainFocus.dataAnalytics) {
      this.moduleDataAnalytics.forEach(m => selected = selected ? true : m.isSelected && m.cp ===3);
    }
    else if(main = MainFocus.scientificComputing) {
      this.moduleScientificComputing.forEach(m => selected = selected ? true : m.isSelected && m.cp ===3);
    }
    else {
      this.moduleComputerEngineering.forEach(m => selected = selected ? true : m.isSelected && m.cp ===3);
    }
    return selected;
  }
}
