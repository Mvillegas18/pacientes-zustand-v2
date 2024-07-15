import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

import { type DraftPatient, type Patient } from './types';

type PatientState = {
	patients: Patient[];
	addPatient: (data: DraftPatient) => void;
};

const createPatient = (patient: DraftPatient): Patient => {
	return { ...patient, id: uuidv4() };
};

export const usePatientStore = create<PatientState>((set) => ({
	patients: [],
	addPatient: (data) =>
		set((state) => ({ patients: [...state.patients, createPatient(data)] })),
}));
