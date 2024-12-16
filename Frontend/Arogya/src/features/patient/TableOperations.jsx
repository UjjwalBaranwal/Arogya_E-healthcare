import Filter from "../../UI/Filter";
import Sort from "../../UI/Sort";

function TableOperations() {
  return (
    <div className="flex gap-x-4  justify-end">
      <Filter
        options={[
          { label: "All Doctor", value: "all" },
          {
            label: "General Practitioner (GP)",
            value: "General Practitioner (GP)",
          },
          { label: "Cardiologist", value: "Cardiologist" },
          { label: "Dermatologist", value: "Dermatologist" },
          { label: "Neurologist", value: "Neurologist" },
          { label: "Endocrinologist", value: "Endocrinologist" },
          { label: "Gastroenterologist", value: "Gastroenterologist" },
          { label: "Oncologist", value: "Oncologist" },
          { label: "Rheumatologist", value: "Rheumatologist" },
          { label: "other", value: "other" },
        ]}
        filterField="specialization"
      />
      <Sort
        options={[
          { label: "Fee-asc", value: "consultationFee-asc" },
          { label: "Fee-desc", value: "consultationFee-desc" },
          { label: "experience-asc", value: "experience-asc" },
          { label: "experience-desc", value: "experience-desc" },
          { label: "timing-asc", value: "timing-asc" },
          { label: "timing-desc", value: "timing-desc" },
          { label: "ratings-asc", value: "ratingsAverage-asc" },
          { label: "ratings-desc", value: "ratingsAverage-desc" },
        ]}
      />
    </div>
  );
}

export default TableOperations;
