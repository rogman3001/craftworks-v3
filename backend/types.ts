export type EvaluationResult = {
  position_id: number;
  bewertung: "rot" | "gelb" | "grün";
  kommentare: string[];
};

export type Position = {
  id: number;
  gewerk_id: number;
  einheit: string;
  gesamtpreis: number;
};
