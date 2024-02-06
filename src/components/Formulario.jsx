import { useState, useEffect } from "react";
import { Error } from "./Error";

export const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropetario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false)

    // console.log(paciente);
    useEffect(() => {
        if(Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre);
            setPropetario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    }, [paciente])
    

    const generarId = () => {
        const random = Math.random().toString(36).substr(2)
        const fecha = Date.now().toString(36)

        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // validando formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            console.log("hay al menos un campo vacio");
            setError(true)

            return
        }

        setError(false)

        // objeto de paciente
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }

        if(paciente.id) {
            // editando
            objetoPaciente.id = paciente.id
            // console.log(objetoPaciente);
            // console.log(paciente);

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

            setPacientes(pacientesActualizados)
            setPaciente({})

        } else {
            // nuevo registro
            objetoPaciente.id = generarId()
            setPacientes([...pacientes, objetoPaciente])
        }


        // reiniciar form
        setNombre('')
        setPropetario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }

    return (
        <>
            <div className="md:w-1/2 lg:w-2/5 mx-5">
                <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

                <p className="text-lg text-center mt-5 mb-10">
                    Añade Pacientes y {''}
                    <span className="text-indigo-600 font-bold ">Administralos</span>
                </p>

                <form 
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                >

                    {error && 
                        <Error>
                            Todos los campos son obligatorios
                        </Error>
                    }

                    <div className="mb-5">
                        <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
                        <input type="text" id="mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre de la mascota"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
                        <input type="text" id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre del propietario"
                            value={propietario}
                            onChange={(e) => setPropetario(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                        <input type="email" id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Email contacto propietario"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
                        <input type="date" id="alta" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
                        <textarea id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los sintomas"
                            value={sintomas}
                            onChange={(e) => setSintomas(e.target.value)}
                        />
                    </div>

                    <input type="submit" 
                        value={paciente.id ? "Editar paciente" : "Agregar paciente"} 
                        className="text-white font-bold uppercase w-full bg-indigo-600 p-3 cursor-pointer hover:bg-indigo-700 transition-all" 
                    />
                </form>
            </div>
        </>
    )
}