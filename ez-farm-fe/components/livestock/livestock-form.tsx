"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/api";

interface LivestockFormProps {
  onCancel: () => void;
}

interface AnimalType {
  id: number;
  name: string;
}

interface Breed {
  id: number;
  name: string;
  animal_type: number;
}

export function LivestockForm({ onCancel }: LivestockFormProps) {
  const { t, direction } = useLanguage();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    animal_type: "",
    breed: "",
    gender: "",
    weight: "",
    status: "",
    notes: "",
  });
  const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [filteredBreeds, setFilteredBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch Animal Types
    fetch(`${API_BASE_URL}/animaltypes/`)
      .then((res) => res.json())
      .then((data) => setAnimalTypes(data))
      .catch((error) => console.error("Error fetching animal types:", error));

    // Fetch Breeds
    fetch(`${API_BASE_URL}/breeds/`)
      .then((res) => res.json())
      .then((data) => setBreeds(data))
      .catch((error) => console.error("Error fetching breeds:", error));
  }, []);

  useEffect(() => {
    // Filter breeds based on selected animal type
    if (formData.animal_type) {
      const filtered = breeds.filter(
        (breed) => breed.animal_type.toString() === formData.animal_type
      );
      setFilteredBreeds(filtered);
    } else {
      setFilteredBreeds([]);
    }
  }, [formData.animal_type, breeds]);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      breed: parseInt(formData.breed),
      gender: formData.gender,
      weight: parseFloat(formData.weight),
      status: formData.status,
      notes: formData.notes,
      birth_date: date ? date.toISOString().split("T")[0] : null,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/ezanimal/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save livestock");

      alert(t("savedSuccessfully"));
      onCancel();
    } catch (error) {
      console.error(error);
      alert(t("errorOccurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Animal Type */}
        <div className="space-y-2">
          <Label htmlFor="animal_type">{t("type")}</Label>
          <Select
            onValueChange={(value) => handleChange("animal_type", value)}
            value={formData.animal_type}
          >
            <SelectTrigger id="animal_type">
              <SelectValue placeholder={t("selectType")} />
            </SelectTrigger>
            <SelectContent>
              {animalTypes.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {t(type.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Breed */}
        <div className="space-y-2">
          <Label htmlFor="breed">{t("breed")}</Label>
          <Select
            onValueChange={(value) => handleChange("breed", value)}
            value={formData.breed}
            disabled={!formData.animal_type}
          >
            <SelectTrigger id="breed">
              <SelectValue placeholder={t("selectBreed")} />
            </SelectTrigger>
            <SelectContent>
              {filteredBreeds.map((breed) => (
                <SelectItem key={breed.id} value={breed.id.toString()}>
                  {t(breed.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender">{t("gender")}</Label>
          <Select
            onValueChange={(value) => handleChange("gender", value)}
            value={formData.gender}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder={t("selectGender")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{t("male")}</SelectItem>
              <SelectItem value="female">{t("female")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Birth Date */}
        <div className="space-y-2">
          <Label htmlFor="birthDate">{t("birthDate")}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : t("selectDate")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <Label htmlFor="weight">{t("weight")}</Label>
          <div className="flex">
            <Input
              id="weight"
              type="number"
              value={formData.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
              placeholder={t("enterWeight")}
              className={cn(
                "rounded-r-none",
                direction === "rtl" ? "text-right" : "text-left"
              )}
            />
            <div className="flex items-center justify-center rounded-r-md border border-l-0 bg-muted px-3 text-sm text-muted-foreground">
              {t("kg")}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">{t("status")}</Label>
          <Select
            onValueChange={(value) => handleChange("status", value)}
            value={formData.status}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder={t("selectStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="healthy">{t("healthy")}</SelectItem>
              <SelectItem value="sick">{t("sick")}</SelectItem>
              <SelectItem value="pregnant">{t("pregnant")}</SelectItem>
              <SelectItem value="lactating">{t("lactating")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">{t("notes")}</Label>
        <Input
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder={t("enterNotes")}
          className={direction === "rtl" ? "text-right" : "text-left"}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          {t("cancel")}
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? t("saving") : t("saveLivestock")}
        </Button>
      </div>
    </form>
  );
}
