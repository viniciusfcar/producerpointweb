import BASE from './base'

export default {

    onSignIn: async (email, password) => {
        try {
            const request = await fetch(`${BASE.API}/signin`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            return request

        } catch (e) {
            console.log('Error: onSignIn ' + e)
        }
    },

    getAllProducers: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/producers/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            return request
        } catch (e) {
            console.log('Erro: getAllProducers ' + e)
        }
    },

    updateProducer: async (
        id, name, nickname, birthDate, phone, cpf, email, houseNumber, reference,
        averageCash, zipCode, city, district, uf, street, activity, resultList, period
    ) => {
        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                name: name,
                nickname: nickname,
                birthDate: null,
                phone: phone,
                cpf: cpf,
                email: email,
                address: {
                    zipCode: zipCode,
                    city: city,
                    uf: uf,
                    district: district,
                    street: street,
                    houseNumber: houseNumber,
                    reference: reference,
                },
                farmingActivity: {
                    averageCash: parseFloat(averageCash),
                    activityName: activity,
                    period: period
                },
                products: resultList,
                manager: {
                    id: 1,
                }
            }

            await fetch(`${BASE.API}/producers/${id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
        } catch (e) {
            console.log('Erro: updateProducer ' + e)
        }
    },

    getAllProducts: async () => {
        try {
            const request = await fetch(`${BASE.API}/products`) || []
            return request
        } catch (e) {
            console.log('Erro: getAllProducts ' + e)
        }
    },

    deleteProducer: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/producers/${id}`, { method: 'DELETE' })
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: deleteProducer ' + e)
        }
    },

}