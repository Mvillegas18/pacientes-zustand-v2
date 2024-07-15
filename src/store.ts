import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { type DraftPatient, type Patient } from './types';

type PatientState = {
	patients: Patient[];
	activeId: Patient['id'];
	addPatient: (data: DraftPatient) => void;
	deletePatient: (id: Patient['id']) => void;
	getPatientById: (id: Patient['id']) => void;
	updatePatient: (data: DraftPatient) => void;
};

const createPatient = (patient: DraftPatient): Patient => {
	return { ...patient, id: uuidv4() };
};

export const usePatientStore = create<PatientState>()(
	devtools(
		persist(
			(set) => ({
				patients: [],
				activeId: '',
				addPatient: (data) =>
					set((state) => ({
						patients: [...state.patients, createPatient(data)],
					})),
				deletePatient: (id) =>
					set((state) => ({
						patients: state.patients.filter((patient) => id !== patient.id),
					})),
				getPatientById: (id) => set(() => ({ activeId: id })),
				updatePatient: (data) =>
					set((state) => ({
						patients: state.patients.map((patient) =>
							patient.id === state.activeId
								? { id: state.activeId, ...data }
								: patient
						),
						activeId: '',
					})),
			}),
			{
				name: 'patient-storage',
			}
		)
	)
);
