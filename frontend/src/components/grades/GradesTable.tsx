import { useState } from 'react';
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

interface GradeData {
  id: string;
  subject: string;
  grade: number;
  semester: string;
  date: string;
}

export function GradesTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof GradeData;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Estado para los filtros
  const [filters, setFilters] = useState({
    semester: '',
    subject: '',
  });

  const handleSort = (key: keyof GradeData) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Barra de búsqueda y filtros */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por materia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Input
          placeholder="Filtrar por semestre"
          value={filters.semester}
          onChange={(e) => setFilters(prev => ({ ...prev, semester: e.target.value }))}
        />
        <Button variant="outline" onClick={() => setFilters({ semester: '', subject: '' })}>
          Limpiar filtros
        </Button>
      </div>

      {/* Tabla */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('subject')}
              >
                Materia
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('grade')}
              >
                Nota
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('semester')}
              >
                Semestre
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('date')}
              >
                Fecha
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Aquí se renderizarán las filas de datos */}
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                No hay calificaciones disponibles
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}