import { toast } from 'react-toastify';
import { usePatientStore } from '../store';
import { type Patient } from '../types';
import PatientDetailItem from './PatientDetailItem';

type PatientDetailProps = {
	patient: Patient;
};

export default function PatientDetails({ patient }: PatientDetailProps) {
	const { deletePatient, getPatientById } = usePatientStore();

	const handleClick = () => {
		deletePatient(patient.id);
		toast('Paciente eliminado', { type: 'error' });
	};

	return (
		<div className='mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl'>
			<PatientDetailItem
				label='ID'
				data={patient.id}
			/>
			<PatientDetailItem
				label='Nombre'
				data={patient.name}
			/>
			<PatientDetailItem
				label='Propietario'
				data={patient.caretaker}
			/>
			<PatientDetailItem
				label='Correo'
				data={patient.email}
			/>
			<PatientDetailItem
				label='Fecha de Alta'
				data={patient.date.toString()}
			/>
			<PatientDetailItem
				label='Sintomas'
				data={patient.symptoms}
			/>

			<div className='flex mt-10 flex-col lg:flex-row gap-3'>
				<button
					className='py-2 px-10 bg-indigo-500 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg'
					onClick={() => getPatientById(patient.id)}>
					Editar
				</button>
				<button
					className='py-2 px-10 bg-red-500 hover:bg-red-700 text-white font-bold uppercase rounded-lg'
					onClick={handleClick}>
					Eliminar
				</button>
			</div>
		</div>
	);
}
