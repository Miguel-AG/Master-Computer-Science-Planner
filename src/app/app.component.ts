import { Component, OnInit } from '@angular/core';

class ComputerScienceModules {
  
  constructor(public _name?: string,
    public semester?: "WS" | "SS" | "WS&SS" | "",
    public cp?: number,
    public isSelected: boolean = false,
    public mark: number = 0) {
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
  title = 'Master Informatik Planer';
  moduleCoreTopics: ComputerScienceModules[];
  moduleDataAnalytics: ComputerScienceModules[];
  moduleScientificComputing: ComputerScienceModules[];
  moduleComputerEngineering: ComputerScienceModules[];
  moduleInterdisiplinary: ComputerScienceModules[];
  moduleAdditional: ComputerScienceModules[];
  moduleMasterThesis: ComputerScienceModules;
  _mainFocus: MainFocus;
  get mainFocus(): MainFocus {
    return this._mainFocus;
  }

  ngOnInit() {
    this.moduleCoreTopics = [
      new ComputerScienceModules("Spezielle Kapitel der Praktischen Informatik", "", 9),
      new ComputerScienceModules("Spezielle Kapitel der Theoretischen Informatik", "", 9),
      new ComputerScienceModules("Spezielle Kapitel der Technischen Informatik", "", 9),
      new ComputerScienceModules("Digitale Transformation", "WS", 6),
    ];

    this.moduleDataAnalytics = [
      new ComputerScienceModules("Einführung in Data Analytics", "WS", 9),
      new ComputerScienceModules("Machine Learning 2", "SS", 6),
      new ComputerScienceModules("Web Information Retrievel", "SS", 6),
      new ComputerScienceModules("Weiterführung Stochastik", "", 9),
      new ComputerScienceModules("Spezial Topics in Data Analytics", "", 9),
      new ComputerScienceModules("Angewandte Statistik", "SS", 9),
      new ComputerScienceModules("Wahrscheinlichkeitstheorie", "WS", 9),
      new ComputerScienceModules("Big Data Technologien", "WS", 6),
      new ComputerScienceModules("Seminar Data Analytics", "SS", 3)
    ];

    this.moduleScientificComputing = [
      new ComputerScienceModules("Parallel Algorithms", "SS", 9),
      new ComputerScienceModules("Discrete Methods for Numerical Computing", "", 9),
      new ComputerScienceModules("Verifikationsnumerik", "WS&SS", 9),
      new ComputerScienceModules("Special Topics in Scientific Computation", "", 9),
      new ComputerScienceModules("Special Topics in Numerical Analysis and Algorithms", "", 9),
      new ComputerScienceModules("Selected Topics in Numerical Analysis and Algorithms", "", 9),
      new ComputerScienceModules("Numerical Analysis ans Simulation 1", "WS", 9),
      new ComputerScienceModules("Numerical Analysis ans Simulation 2 (PDE)", "SS", 9),
      new ComputerScienceModules("Numerical Methods 2", "", 6),
      new ComputerScienceModules("Seminar Scientific Computing", "", 3),
    ];

    this.moduleComputerEngineering = [
      new ComputerScienceModules("Digitalisierung und informationstechnologische Netzwerke", "SS", 6),
      new ComputerScienceModules("IT-Security in Informations- und Kommunikationstechnik", "", 6),
      new ComputerScienceModules("Embedded Security", "", 6),
      new ComputerScienceModules("Multimodale Mensch-Maschine-Systeme", "", 6),
      new ComputerScienceModules("Informationsverarbeitung", "", 6),
      new ComputerScienceModules("System- und Softwareentwicklung", "WS", 6),
      new ComputerScienceModules("Numerische Methoden des Computational Engineering", "", 6),
      new ComputerScienceModules("Entwurf digitaler Syseme in VHDL", "", 6),
      new ComputerScienceModules("Digital Media", "", 6),
      new ComputerScienceModules("Informationstechnik für elektrische Energiesysteme", "", 6),
      new ComputerScienceModules("Seminar Computer Engineering", "", 3),
    ];

    this.moduleInterdisiplinary = [
      new ComputerScienceModules("Computational Finance 1", "WS", 9),
      new ComputerScienceModules("Computational Finance 2", "SS", 9),
      new ComputerScienceModules("Ausgewählte Kapitel der Wirtschaftsmathematik", "", 9),
      new ComputerScienceModules("Angewandte Statistik", "SS", 9),
      new ComputerScienceModules("Integrierte Schaltung in der Hochfrequenztechnik", "SS", 6),
      new ComputerScienceModules("Methodischer Entwurf elektronischer Systeme", "", 6),
      new ComputerScienceModules("Komponenten für Mobilfunksysteme", "SS", 6),
      new ComputerScienceModules("Regenerative Energiequellen", "SS", 6),
      new ComputerScienceModules("Optimierungsmethoden in der Reglungstechnik", "", 6),
      new ComputerScienceModules("Einführung in MATLAB/Simulink für elektrische Nachrichtentechnik", "SS", 3),
    ];

    this.moduleAdditional = [
      new ComputerScienceModules("Fremdsprachen", "WS&SS", 6),
      new ComputerScienceModules("Grundzüge des Gründungsmanagements 1 & 2 + Seminar(SS)", "WS&SS", 12),
      new ComputerScienceModules("Vermittlung und Unterricht", "", 6),
    ];

    this.moduleMasterThesis = new ComputerScienceModules("Masterarbeit mit Abschlusskolloquium", "WS&SS", 30);

  }

  setMainFocus(focus: MainFocus) {

    this._mainFocus = this._mainFocus === focus ? null : focus;
  }

  isMainFocus(focus: MainFocus): boolean {
    return this._mainFocus === focus;
  }

  calculateWPModule(moduleList: ComputerScienceModules[]): number {
    let value = 0;
    for (const m of moduleList) {
      value += m.isSelected ? m.cp : 0;
    }
    return value;
  }

  calculateMarkModule(moduleList: ComputerScienceModules[]): number {
    let value = 0;
    let weight = 0;
    for (const m of moduleList) {
      value += m.isSelected ? m.mark * m.cp : 0;
      weight += m.isSelected && m.mark > 0 ? m.cp : 0;
    }
    return weight > 0 ? Number((value / weight).toFixed(4)) : 0;
  }

  calculateWPAllModules(): number {
    let value = 0;
    value += this.calculateWPModule(this.moduleCoreTopics);
    value += this.calculateWPModule(this.moduleDataAnalytics);
    value += this.calculateWPModule(this.moduleScientificComputing);
    value += this.calculateWPModule(this.moduleComputerEngineering);
    value += this.calculateWPModule(this.moduleInterdisiplinary);
    value += this.calculateWPModule(this.moduleAdditional);
    value += this.calculateWPModule([this.moduleMasterThesis]);
    return value;
  }

  calculateMarkAllModules(): number {
    let value = 0;
    let weigth = 0;
    value += this.calculateMarkModule(this.moduleCoreTopics) * this.calculateWPModule(this.moduleCoreTopics);
    weigth += this.calculateMarkModule(this.moduleCoreTopics) > 0 ? this.calculateWPModule(this.moduleCoreTopics) : 0;

    value += this.calculateMarkModule(this.moduleDataAnalytics) * this.calculateWPModule(this.moduleDataAnalytics);
    weigth += this.calculateMarkModule(this.moduleDataAnalytics) > 0 ? this.calculateWPModule(this.moduleDataAnalytics) : 0;

    value += this.calculateMarkModule(this.moduleScientificComputing) * this.calculateWPModule(this.moduleScientificComputing);
    weigth += this.calculateMarkModule(this.moduleScientificComputing) > 0 ? this.calculateWPModule(this.moduleScientificComputing) : 0;

    value += this.calculateMarkModule(this.moduleComputerEngineering) * this.calculateWPModule(this.moduleComputerEngineering);
    weigth += this.calculateMarkModule(this.moduleComputerEngineering) > 0 ? this.calculateWPModule(this.moduleComputerEngineering) : 0;

    value += this.calculateMarkModule(this.moduleInterdisiplinary) * this.calculateWPModule(this.moduleInterdisiplinary);
    weigth += this.calculateMarkModule(this.moduleInterdisiplinary) > 0 ? this.calculateWPModule(this.moduleInterdisiplinary) : 0;

    value += this.calculateMarkModule(this.moduleAdditional) * this.calculateWPModule(this.moduleAdditional);
    weigth += this.calculateMarkModule(this.moduleAdditional) > 0 ? this.calculateWPModule(this.moduleAdditional) : 0;

    value += this.calculateMarkModule([this.moduleMasterThesis]) * this.calculateWPModule([this.moduleMasterThesis]);
    weigth += this.calculateMarkModule([this.moduleMasterThesis]) > 0 ? this.calculateWPModule([this.moduleMasterThesis]) : 0;

    return weigth > 0 ? Number((value / weigth).toFixed(4)) : 0;
  }

  toLessWPDataAnalytics(): boolean {
    let value = 0;
    let value2 = 0;
    let value3 = 0;
    this.moduleDataAnalytics.forEach(m => value += m.isSelected ? m.cp : 0);
    this.moduleScientificComputing.forEach(m => value2 += m.isSelected ? m.cp : 0);
    this.moduleComputerEngineering.forEach(m => value3 += m.isSelected ? m.cp : 0);
    if(this._mainFocus === 0) {
      return value < 39;
    }else if(this._mainFocus === 1) {
      return (value + value3) < 18;
    }else if(this._mainFocus === 2) {
      return (value + value2) < 18;
    }else {
      return (value + value2 + value3) <18;
    }
  }
  toLessWPScientificComputing(): boolean {
    let value = 0;
    let value2 = 0;
    let value3 = 0;
    this.moduleDataAnalytics.forEach(m => value += m.isSelected ? m.cp : 0);
    this.moduleScientificComputing.forEach(m => value2 += m.isSelected ? m.cp : 0);
    this.moduleComputerEngineering.forEach(m => value3 += m.isSelected ? m.cp : 0);
    if(this._mainFocus === 0) {
      return (value2 + value3) < 18;
    }else if(this._mainFocus === 1) {
      return value2 < 39;
    }else if(this._mainFocus === 2) {
      return (value + value2) < 18;
    }else {
      return (value + value2 + value3) <18;
    }
  }
  toLessWPComputerEngineering(): boolean {
    let value = 0;
    let value2 = 0;
    let value3 = 0;
    this.moduleDataAnalytics.forEach(m => value += m.isSelected ? m.cp : 0);
    this.moduleScientificComputing.forEach(m => value2 += m.isSelected ? m.cp : 0);
    this.moduleComputerEngineering.forEach(m => value3 += m.isSelected ? m.cp : 0);
    if(this._mainFocus === 0) {
      return (value2 + value3) < 18;
    }else if(this._mainFocus === 1) {
      return (value + value3) < 18;
    }else if(this._mainFocus === 2) {
      return value3 < 39;
    }else {
      return (value + value2 + value3) <18;
    }
  }
  toLessWPInterdisiplinary(): boolean {
    let value = 0;
    this.moduleInterdisiplinary.forEach(m => value += m.isSelected ? m.cp : 0);
    return value < 9 || value > 18;
  }
  toLessWPAdditional(): boolean {
    let value = 0;
    this.moduleAdditional.forEach(m => value += m.isSelected ? m.cp : 0);
    return value < 6 || value > 15;
  }

  isSeminarSelected(main: MainFocus): boolean {
    let selected = false;
    if (main === MainFocus.dataAnalytics) {
      this.moduleDataAnalytics.forEach(m => selected = selected ? true : m.isSelected && m.cp ===3);
    }
    else if(main === MainFocus.scientificComputing) {
      this.moduleScientificComputing.forEach(m => selected = selected ? true : m.isSelected && m.cp ===3);
    }
    else if(main === MainFocus.computerEngineering){
      this.moduleComputerEngineering.forEach(m => selected = selected ? true : m.isSelected && m.cp ===3);
    }
    return selected;
  }
}
