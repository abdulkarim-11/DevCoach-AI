<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevCoach AI - Struts 7 & Hibernate 6</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #fafafa; color: #171717; }
        .dark { background-color: #0a0a0a; color: #ededed; }
        input[type="date"] { appearance: none; -webkit-appearance: none; }
    </style>
</head>
<body class="p-4 md:p-8">
    <div class="max-w-4xl mx-auto">
        <header class="flex justify-between items-center mb-8">
            <h1 class="text-2xl md:text-3xl font-bold tracking-tight">DevCoach Logboek</h1>
            <div class="text-sm text-gray-500">Struts 7.0.3 + Hibernate 6.6.13</div>
        </header>

        <!-- Form for adding/saving -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
            <h2 class="text-lg font-semibold mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Nieuwe Entry
            </h2>
            <s:form action="saveText" method="post" cssClass="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Datum</label>
                        <s:textfield name="textObject.date" type="date" cssClass="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Uren Besteed</label>
                        <s:textfield name="textObject.hours" type="number" step="0.5" placeholder="0.0" cssClass="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Concrete Taken</label>
                    <s:textarea name="textObject.tasks" placeholder="Wat heb je vandaag gedaan?" cssClass="w-full border border-gray-200 p-2.5 rounded-lg h-24 focus:ring-2 focus:ring-black outline-none transition-all resize-none" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 text-green-600">Wat ging goed?</label>
                        <s:textarea name="textObject.good" cssClass="w-full border border-gray-200 p-2.5 rounded-lg h-20 focus:ring-2 focus:ring-black outline-none transition-all resize-none" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 text-orange-600">Wat kan beter?</label>
                        <s:textarea name="textObject.bad" cssClass="w-full border border-gray-200 p-2.5 rounded-lg h-20 focus:ring-2 focus:ring-black outline-none transition-all resize-none" />
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Bewijs Link (GitHub/Figma)</label>
                    <s:textfield name="textObject.evidenceLink" placeholder="https://github.com/..." cssClass="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
                </div>
                <div class="pt-2">
                    <s:submit value="Logboek Opslaan" cssClass="w-full md:w-auto bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors cursor-pointer shadow-lg shadow-black/10" />
                </div>
            </s:form>
        </div>

        <!-- List of entries -->
        <div class="space-y-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-bold">Geschiedenis</h2>
                <span class="text-sm bg-gray-100 px-3 py-1 rounded-full font-medium"><s:property value="textObjects.size()"/> entries</span>
            </div>
            
            <s:if test="textObjects.isEmpty()">
                <div class="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <p class="text-gray-500">Er zijn nog geen logs om weer te geven.</p>
                </div>
            </s:if>
            
            <s:iterator value="textObjects">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-gray-300 transition-all group overflow-hidden relative">
                    <div class="flex justify-between items-start mb-5 pb-4 border-b border-gray-50">
                        <div>
                            <div class="text-lg font-bold text-gray-900"><s:property value="date"/></div>
                            <div class="text-sm text-gray-500 font-medium"><s:property value="hours"/> uur geregistreerd</div>
                        </div>
                        <s:form action="deleteText" method="post" cssClass="opacity-0 group-hover:opacity-100 transition-opacity">
                            <s:hidden name="id" value="%{id}" />
                            <button type="submit" class="text-red-400 hover:text-red-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                            </button>
                        </s:form>
                    </div>
                    
                    <div class="mb-6">
                        <h4 class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Uitgevoerde Taken</h4>
                        <p class="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap"><s:property value="tasks"/></p>
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div class="p-4 bg-green-50/50 rounded-lg border border-green-100/50">
                            <h4 class="text-[9px] font-bold uppercase tracking-widest text-green-600 mb-2">Succes</h4>
                            <p class="text-gray-700 text-xs leading-relaxed"><s:property value="good"/></p>
                        </div>
                        <div class="p-4 bg-orange-50/50 rounded-lg border border-orange-100/50">
                            <h4 class="text-[9px] font-bold uppercase tracking-widest text-orange-600 mb-2">Verbetering</h4>
                            <p class="text-gray-700 text-xs leading-relaxed"><s:property value="bad"/></p>
                        </div>
                    </div>

                    <s:if test="evidenceLink != null && !evidenceLink.isEmpty()">
                        <div class="flex items-center gap-2 text-xs">
                             <div class="bg-gray-100 p-1.5 rounded text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                             </div>
                             <a href="<s:property value='evidenceLink'/>" target="_blank" class="text-blue-600 font-medium hover:underline truncate">
                                <s:property value="evidenceLink"/>
                             </a>
                        </div>
                    </s:if>
                </div>
            </s:iterator>
        </div>
    </div>
</body>
</html>
