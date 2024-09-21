import {faker} from '@faker-js/faker';
import path from "path";
import fs from "fs";
import { UserData } from "../interfaces/user.interface";

const generateUserData = (): UserData => {
    return {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        phone: faker.phone.number(),
        age: faker.number.int({ min: 18, max: 99 }),
        address: faker.location.streetAddress(),
    }
}

export const generateTestData = (numberOfRecords: number): UserData[] => {
    return faker.helpers.multiple(generateUserData,
        { count: numberOfRecords });
}

const getDirectoryPath = (): string => {
    const srcDir = path.resolve(__dirname, "..");
    return path.resolve(srcDir, "testdata");
}

export const exportToJson = (data: UserData[], fileName: string) => {
    const filePath = `${getDirectoryPath()}\\${fileName}`;
    fs.writeFileSync(`${filePath}`, JSON.stringify(data, null, 2));
    console.log(`Data exported to JSON file: ${filePath} successfully.`)
}