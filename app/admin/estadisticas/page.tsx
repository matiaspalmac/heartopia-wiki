import { getTopUsers, getTopCollectors, getTriviaStats } from "@/lib/db";
import Link from "next/link";

export const revalidate = 0; // Don't cache admin stats

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
                <p className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-0.5">
                    Métricas del Servidor
                </p>
                <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                    Estadísticas Globales
                </h2>
                <p className="text-sm text-neutral-400 mt-1">
                    Vista general de la participación comunitaria en el pueblito.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Panel Tritvia */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-6 flex items-center gap-2">
                        🧠 Estadísticas de Trivias
                    </h3>
                    <div className="flex gap-4 mb-6">
                        <div className="bg-neutral-50 dark:bg-neutral-950 p-4 rounded-2xl flex-1 border border-neutral-100 dark:border-neutral-800">
                            <span className="block text-3xl font-black text-pink-500">{triviaStats.total}</span>
                            <span className="text-xs uppercase font-bold text-neutral-400">Total Lanzadas</span>
                        </div>
                        <div className="bg-neutral-50 dark:bg-neutral-950 p-4 rounded-2xl flex-1 border border-neutral-100 dark:border-neutral-800 relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 top-0 w-2 bg-gradient-to-b from-emerald-400 to-green-500 rounded-r-2xl" />
                            <span className="block text-3xl font-black text-emerald-500">{hitRate}%</span>
                            <span className="text-xs uppercase font-bold text-neutral-400">Tasa de Acierto</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Habitantes más preguntados</h4>
                        <div className="space-y-2">
                            {triviaStats.topHabitantes.map((h, i) => (
                                <div key={i} className="flex justify-between items-center text-sm py-1 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
                                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">🦊 {h.habitante}</span>
                                    <span className="text-pink-500 font-bold bg-pink-50 dark:bg-pink-900/40 px-2 py-0.5 rounded-md">{h.veces} veces</span>
                                </div>
                            ))}
                            {triviaStats.topHabitantes.length === 0 && (
                                <span className="text-neutral-400 text-sm">Sin datos aún</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Top Coleccionistas */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-6 flex items-center gap-2">
                        🌟 Top Coleccionistas
                    </h3>
                    <p className="text-xs text-neutral-400 mb-4">Vecinos con mayor cantidad de items registrados en su libretita.</p>
                    <div className="space-y-3">
                        {topCollectors.map((c, i) => (
                            <Link key={i} href={`/perfil/${c.user_id}`} target="_blank" className="flex justify-between items-center p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/50 hover:bg-pink-50 dark:hover:bg-pink-950/20 border border-neutral-100 dark:border-neutral-800 transition group cursor-pointer">
                                <span className="font-bold text-neutral-700 dark:text-neutral-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 text-sm flex items-center gap-2">
                                    <span className="text-neutral-300 dark:text-neutral-600 font-black w-4 text-xs">{i + 1}.</span>
                                    {c.username ? `@${c.username}` : `#${c.user_id.slice(-4)}`}
                                </span>
                                <span className="text-sm font-black text-amber-500">{c.total_items} ítems</span>
                            </Link>
                        ))}
                        {topCollectors.length === 0 && <span className="text-neutral-400 text-sm">Nadie ha registrado items aún.</span>}
                    </div>
                </div>
            </div>

            {/* Top Usuarios XP */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-6 flex items-center gap-2">
                    ✨ Ranking de Veteranos (XP)
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-neutral-400 uppercase bg-neutral-50 dark:bg-neutral-950">
                            <tr>
                                <th className="px-4 py-3 rounded-tl-xl rounded-bl-xl font-bold tracking-wider">#</th>
                                <th className="px-4 py-3 font-bold tracking-wider">Usuario</th>
                                <th className="px-4 py-3 font-bold tracking-wider">Nivel</th>
                                <th className="px-4 py-3 font-bold tracking-wider">Experiencia</th>
                                <th className="px-4 py-3 rounded-tr-xl rounded-br-xl font-bold tracking-wider">Monedas</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {topUsers.map((u, i) => (
                                <tr key={u.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-950/50 transition">
                                    <td className="px-4 py-3 font-bold text-neutral-400">{i + 1}</td>
                                    <td className="px-4 py-3 font-bold text-neutral-700 dark:text-neutral-300">
                                        <Link href={`/perfil/${u.id}`} target="_blank" className="hover:text-pink-500 hover:underline">
                                            {u.username ? `@${u.username}` : `#${u.id.slice(-4)}`}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 font-black text-amber-500">{u.nivel}</td>
                                    <td className="px-4 py-3 text-pink-600 dark:text-pink-400 font-bold">{u.xp}</td>
                                    <td className="px-4 py-3 text-yellow-600 dark:text-yellow-500 font-bold">{u.monedas}</td>
                                </tr>
                            ))}
                            {topUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-neutral-400">Sin usuarios registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div >
        </div >
    );
}
