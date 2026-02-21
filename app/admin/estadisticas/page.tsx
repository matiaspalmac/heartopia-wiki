import { getTopUsers, getTopCollectors, getTriviaStats } from "@/lib/db";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;

export default async function EstadisticasPage() {
    const topUsers = await getTopUsers(10);
    const topCollectors = await getTopCollectors(10);
    const triviaStats = await getTriviaStats();

    const hitRate = triviaStats.total > 0
        ? Math.round((triviaStats.respondidas / triviaStats.total) * 100)
        : 0;

    return (
        <div>
            <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-0.5">
                    Metricas del Servidor
                </p>
                <h2 className="text-3xl font-black text-foreground">
                    Estadisticas Globales
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Vista general de la participacion comunitaria en el pueblito.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Trivia Panel */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-black text-foreground mb-6 flex items-center gap-2">
                        Estadisticas de Trivias
                    </h3>
                    <div className="flex gap-4 mb-6">
                        <div className="bg-secondary/50 p-4 rounded-2xl flex-1 border border-border">
                            <span className="block text-3xl font-black text-primary">{triviaStats.total}</span>
                            <span className="text-xs uppercase font-bold text-muted-foreground">Total Lanzadas</span>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-2xl flex-1 border border-border relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 top-0 w-1.5 bg-gradient-to-b from-green-400 to-emerald-500 rounded-r-2xl" />
                            <span className="block text-3xl font-black text-green-600 dark:text-green-400">{hitRate}%</span>
                            <span className="text-xs uppercase font-bold text-muted-foreground">Tasa de Acierto</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Habitantes mas preguntados</h4>
                        <div className="space-y-2">
                            {triviaStats.topHabitantes.map((h, i) => (
                                <div key={i} className="flex justify-between items-center text-sm py-2 border-b border-border last:border-0">
                                    <span className="font-semibold text-foreground">{h.habitante}</span>
                                    <Badge variant="secondary" className="text-xs">{h.veces} veces</Badge>
                                </div>
                            ))}
                            {triviaStats.topHabitantes.length === 0 && (
                                <span className="text-muted-foreground text-sm">Sin datos aun</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Top Collectors */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-black text-foreground mb-6 flex items-center gap-2">
                        Top Coleccionistas
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">Vecinos con mayor cantidad de items registrados en su libretita.</p>
                    <div className="space-y-2">
                        {topCollectors.map((c, i) => (
                            <Link key={i} href={`/perfil/${c.user_id}`} target="_blank" className="flex justify-between items-center p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 border border-transparent hover:border-primary/20 transition group cursor-pointer">
                                <span className="font-bold text-foreground group-hover:text-primary text-sm flex items-center gap-2">
                                    <span className="text-muted-foreground font-black w-5 text-xs">{i + 1}.</span>
                                    {c.username ? `@${c.username}` : `#${c.user_id.slice(-4)}`}
                                </span>
                                <Badge variant="outline" className="font-black text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800">{c.total_items} items</Badge>
                            </Link>
                        ))}
                        {topCollectors.length === 0 && <span className="text-muted-foreground text-sm">Nadie ha registrado items aun.</span>}
                    </div>
                </div>
            </div>

            {/* Top Users XP */}
            <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-black text-foreground mb-6 flex items-center gap-2">
                    Ranking de Veteranos (XP)
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
                            <tr>
                                <th className="px-4 py-3 rounded-tl-xl rounded-bl-xl font-bold tracking-wider">#</th>
                                <th className="px-4 py-3 font-bold tracking-wider">Usuario</th>
                                <th className="px-4 py-3 font-bold tracking-wider">Nivel</th>
                                <th className="px-4 py-3 font-bold tracking-wider">Experiencia</th>
                                <th className="px-4 py-3 rounded-tr-xl rounded-br-xl font-bold tracking-wider">Monedas</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {topUsers.map((u, i) => (
                                <tr key={u.id} className="hover:bg-secondary/30 transition">
                                    <td className="px-4 py-3 font-bold text-muted-foreground">{i + 1}</td>
                                    <td className="px-4 py-3 font-bold text-foreground">
                                        <Link href={`/perfil/${u.id}`} target="_blank" className="hover:text-primary hover:underline">
                                            {u.username ? `@${u.username}` : `#${u.id.slice(-4)}`}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 font-black text-amber-600 dark:text-amber-400">{u.nivel}</td>
                                    <td className="px-4 py-3 text-primary font-bold">{u.xp}</td>
                                    <td className="px-4 py-3 text-yellow-600 dark:text-yellow-400 font-bold">{u.monedas}</td>
                                </tr>
                            ))}
                            {topUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Sin usuarios registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
