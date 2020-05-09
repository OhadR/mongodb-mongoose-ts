import { Citizen } from "../schemas/citizenSchema";

export class CitizenRepository {
    async getAll() {
        return Citizen.find({}).sort({createdAt: -1});
    }

    async getOne(itemId) {
        return Citizen.findOne({_id: itemId});
    }

    async getOneByField(fieldKey: string, fieldValue) {
        console.log('fieldKey=' + fieldKey);
        return Citizen.findOne({[fieldKey]: fieldValue});
    }

    async create(
        name: string,
        ssid: number,
    ) {
        const citizen = new Citizen({
            name,
            ssid,
        });

        try {
            await citizen.save();
            console.log('citizen was created');
        } catch (error) {
            console.error('# ' + error);
        }
    }

    async update(itemId, data) {
        const item = await this.getOne(itemId);

        if(!item)
            throw new Error('could not find the requested item');

        Object.keys(data).forEach((key) => {
            item[key] = data[key];
        });
        return item.save();


    }


}
