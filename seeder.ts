import db from "./src/config/db";
import "colors";
import convertExcelToJson from "convert-excel-to-json";
import DepartmentModel from "./src/models/Department.model";
import PersonnelModel from "./src/models/Personnel.model";

const readXls = (filename: string) => {
  const result = convertExcelToJson({
    sourceFile: filename,
    header: {rows: 1}, // Skip the first row if it's a header
    columnToKey: {
      "*": "{{columnHeader}}" // Use the header names as keys
    }
  });

  const departments = result.Departments || [];
  const personnels = result.Personnels || [];
  return {departments, personnels};
};

const importData = async () => {
  try {
    await db();
    const {departments, personnels} = readXls("./data.xlsx");

    if (departments.length) {
      await DepartmentModel.create(departments);
      console.log(
          `Departments Data Imported: ${departments.length} Documents Inserted`.green.inverse
      );
    }

    if (personnels.length) {
      await PersonnelModel.create(personnels);
      console.log(
          `Personnel Data Imported: ${personnels.length} Documents Inserted`.green.inverse
      );
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`.red);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await db();
    const dept = await DepartmentModel.deleteMany();
    const per = await PersonnelModel.deleteMany();

    console.log(`Data Destroyed`.red.inverse);
    console.log(`Departments: ${dept.deletedCount}`.red);
    console.log(`Personnels: ${per.deletedCount}`.red);

    process.exit();
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`.red);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
