import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from 'lucide-react';

interface Grade {
  subject: string;
  grade1: number;
  grade2: number;
  grade3: number;
  final: number;
}

const mockGrades: Grade[] = [
  {
    subject: "Programación Avanzada",
    grade1: 4.5,
    grade2: 4.2,
    grade3: 4.8,
    final: 4.5
  },
  {
    subject: "Bases de Datos",
    grade1: 4.0,
    grade2: 4.5,
    grade3: 4.3,
    final: 4.3
  },
  {
    subject: "Ingeniería de Software",
    grade1: 4.7,
    grade2: 4.6,
    grade3: 4.9,
    final: 4.7
  }
];

export function GradesTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    semester: '',
    subject: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setGrades(mockGrades);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="grid gap-4 md:grid-cols-4 transition-all duration-300 ease-in-out">
        <div className="relative md:col-span-2 transition-transform duration-300 hover:scale-[1.02]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por materia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 transition-all duration-300 hover:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Input
          placeholder="Filtrar por semestre"
          value={filters.semester}
          onChange={(e) => setFilters(prev => ({ ...prev, semester: e.target.value }))}
          className="transition-all duration-300 hover:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <Button 
          variant="outline" 
          onClick={() => setFilters({ semester: '', subject: '' })}
          className="transition-all duration-300 hover:bg-primary/10 active:scale-95"
        >
          Limpiar filtros
        </Button>
      </div>

      <div className="rounded-md border transition-all duration-300 hover:shadow-lg">
        <Table>
          <TableHeader>
            <TableRow className="transition-colors duration-200 hover:bg-muted/50">
              <TableHead className="w-[300px]">Materia</TableHead>
              <TableHead>Nota 1</TableHead>
              <TableHead>Nota 2</TableHead>
              <TableHead>Nota 3</TableHead>
              <TableHead>Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map((grade, index) => (
              <TableRow 
                key={grade.subject}
                className={`transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:bg-gray-50`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animation: `fadeIn 0.5s ease-out ${index * 100}ms forwards`
                }}
              >
                <TableCell className="font-medium">{grade.subject}</TableCell>
                <TableCell>{grade.grade1}</TableCell>
                <TableCell>{grade.grade2}</TableCell>
                <TableCell>{grade.grade3}</TableCell>
                <TableCell className="font-semibold">{grade.final}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}