export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Gespräch',
    description:
      'Kurzes Briefing per Call oder Mail. Ziele, Bildwelt, Rahmen — ohne Formularstrecke.',
  },
  {
    number: '02',
    title: 'Konzept',
    description:
      'Klares Angebot mit Bildrichtung, Zeitplan und festem Preis. Keine offenen Schleifen.',
  },
  {
    number: '03',
    title: 'Umsetzung',
    description:
      'Shooting, Schnitt, Launch. Du bekommst nutzbare Assets, kein Material zum Sortieren.',
  },
];
