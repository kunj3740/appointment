"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/appointments/page",{

/***/ "(app-pages-browser)/./app/appointments/page.tsx":
/*!***********************************!*\
  !*** ./app/appointments/page.tsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ AppointmentsPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_ui_calendar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/calendar */ \"(app-pages-browser)/./components/ui/calendar.tsx\");\n/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/card */ \"(app-pages-browser)/./components/ui/card.tsx\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.tsx\");\n/* harmony import */ var _components_doctors_doctor_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/doctors/doctor-card */ \"(app-pages-browser)/./components/doctors/doctor-card.tsx\");\n/* harmony import */ var _components_appointments_time_slot_picker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/appointments/time-slot-picker */ \"(app-pages-browser)/./components/appointments/time-slot-picker.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nconst TIME_SLOTS = [\n    \"09:00\",\n    \"10:00\",\n    \"11:00\",\n    \"14:00\",\n    \"15:00\",\n    \"16:00\"\n];\nfunction AppointmentsPage() {\n    _s();\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const [doctor, setDoctor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [selectedDate, setSelectedDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [selectedTime, setSelectedTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchDoctor = async ()=>{\n            const doctorId = searchParams.get(\"id\");\n            if (!doctorId) {\n                setError(\"No doctor ID provided\");\n                setIsLoading(false);\n                return;\n            }\n            try {\n                setIsLoading(true);\n                const response = await fetch(\"http://localhost:8000/api/doctor/\".concat(doctorId));\n                if (!response.ok) {\n                    throw new Error(\"Failed to fetch doctor details\");\n                }\n                const data = await response.json();\n                setDoctor(data.doctor);\n            } catch (err) {\n                setError(err instanceof Error ? err.message : \"An error occurred\");\n            } finally{\n                setIsLoading(false);\n            }\n        };\n        fetchDoctor();\n    }, [\n        searchParams\n    ]);\n    const handleBooking = async ()=>{\n        if (!selectedDate || !selectedTime) {\n            setError(\"Please select a date and time slot.\");\n            return;\n        }\n        const doctorId = searchParams.get(\"id\");\n        const token = \"your-token-here\"; // Replace with actual token logic\n        const payload = {\n            doctorId,\n            date: selectedDate.toISOString().split(\"T\")[0],\n            slot: {\n                startTime: selectedTime,\n                endTime: \"\".concat(selectedTime.split(\":\")[0], \":\").concat(+selectedTime.split(\":\")[1] + 30) // End time +30 mins\n            }\n        };\n        try {\n            const response = await fetch(\"http://localhost:8000/api/appointment\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    Authorization: \"Bearer \".concat(token)\n                },\n                body: JSON.stringify(payload)\n            });\n            if (!response.ok) {\n                throw new Error(\"Slot already booked. Please select a different slot.\");\n            }\n            const data = await response.json();\n            alert(data.message); // Optional success message\n            router.push(\"/wallet\");\n        } catch (err) {\n            setError(err instanceof Error ? err.message : \"Failed to book appointment.\");\n        }\n    };\n    if (isLoading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"container mx-auto py-8\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex items-center justify-center min-h-[400px]\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-lg text-muted-foreground\",\n                    children: \"Loading doctor details...\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                    lineNumber: 100,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                lineNumber: 99,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n            lineNumber: 98,\n            columnNumber: 7\n        }, this);\n    }\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"container mx-auto py-8\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex items-center justify-center min-h-[400px]\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-lg text-red-500\",\n                    children: error\n                }, void 0, false, {\n                    fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                    lineNumber: 110,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                lineNumber: 109,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n            lineNumber: 108,\n            columnNumber: 7\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"container mx-auto py-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-3xl font-bold mb-8\",\n                children: \"Book an Appointment\"\n            }, void 0, false, {\n                fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                lineNumber: 118,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid grid-cols-1 md:grid-cols-3 gap-6\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.Card, {\n                        className: \"md:col-span-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardHeader, {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardTitle, {\n                                    children: \"Doctor Details\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                                    lineNumber: 123,\n                                    columnNumber: 13\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                                lineNumber: 122,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardContent, {\n                                children: doctor && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_doctors_doctor_card__WEBPACK_IMPORTED_MODULE_6__.DoctorCard, {\n                                    doctor: doctor\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                                    lineNumber: 126,\n                                    columnNumber: 24\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                                lineNumber: 125,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                        lineNumber: 121,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.Card, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardHeader, {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardTitle, {\n                                    children: \"Select Date & Time\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                                    lineNumber: 132,\n                                    columnNumber: 13\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                                lineNumber: 131,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardContent, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_calendar__WEBPACK_IMPORTED_MODULE_3__.Calendar, {\n                                        mode: \"single\",\n                                        selected: selectedDate,\n                                        onSelect: setSelectedDate,\n                                        className: \"mb-4\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                                        lineNumber: 135,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_appointments_time_slot_picker__WEBPACK_IMPORTED_MODULE_7__.TimeSlotPicker, {\n                                        slots: TIME_SLOTS,\n                                        onSelect: setSelectedTime\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                                        lineNumber: 141,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__.Button, {\n                                        onClick: handleBooking,\n                                        className: \"mt-4\",\n                                        children: \"Book Appointment\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                                        lineNumber: 145,\n                                        columnNumber: 13\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                                lineNumber: 134,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                        lineNumber: 130,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n                lineNumber: 120,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\appointment\\\\frontend\\\\app\\\\appointments\\\\page.tsx\",\n        lineNumber: 117,\n        columnNumber: 5\n    }, this);\n}\n_s(AppointmentsPage, \"/T+qv69f/is1gvW4vPVIdGHM3wA=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = AppointmentsPage;\nvar _c;\n$RefreshReg$(_c, \"AppointmentsPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9hcHBvaW50bWVudHMvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUU0QztBQUNpQjtBQUNUO0FBQzRCO0FBQ2hDO0FBR2M7QUFDYztBQUU1RSxNQUFNWSxhQUFhO0lBQUM7SUFBUztJQUFTO0lBQVM7SUFBUztJQUFTO0NBQVE7QUFLMUQsU0FBU0M7O0lBQ3RCLE1BQU1DLGVBQWVaLGdFQUFlQTtJQUNwQyxNQUFNYSxTQUFTWiwwREFBU0E7SUFDeEIsTUFBTSxDQUFDYSxRQUFRQyxVQUFVLEdBQUdoQiwrQ0FBUUEsQ0FBZ0I7SUFDcEQsTUFBTSxDQUFDaUIsY0FBY0MsZ0JBQWdCLEdBQUdsQiwrQ0FBUUE7SUFDaEQsTUFBTSxDQUFDbUIsY0FBY0MsZ0JBQWdCLEdBQUdwQiwrQ0FBUUEsQ0FBZ0I7SUFDaEUsTUFBTSxDQUFDcUIsV0FBV0MsYUFBYSxHQUFHdEIsK0NBQVFBLENBQUM7SUFDM0MsTUFBTSxDQUFDdUIsT0FBT0MsU0FBUyxHQUFHeEIsK0NBQVFBLENBQWdCO0lBRWxERCxnREFBU0EsQ0FBQztRQUNSLE1BQU0wQixjQUFjO1lBQ2xCLE1BQU1DLFdBQVdiLGFBQWFjLEdBQUcsQ0FBQztZQUNsQyxJQUFJLENBQUNELFVBQVU7Z0JBQ2JGLFNBQVM7Z0JBQ1RGLGFBQWE7Z0JBQ2I7WUFDRjtZQUVBLElBQUk7Z0JBQ0ZBLGFBQWE7Z0JBQ2IsTUFBTU0sV0FBVyxNQUFNQyxNQUFNLG9DQUE2QyxPQUFUSDtnQkFFakUsSUFBSSxDQUFDRSxTQUFTRSxFQUFFLEVBQUU7b0JBQ2hCLE1BQU0sSUFBSUMsTUFBTTtnQkFDbEI7Z0JBRUEsTUFBTUMsT0FBTyxNQUFNSixTQUFTSyxJQUFJO2dCQUNoQ2pCLFVBQVVnQixLQUFLakIsTUFBTTtZQUN2QixFQUFFLE9BQU9tQixLQUFLO2dCQUNaVixTQUFTVSxlQUFlSCxRQUFRRyxJQUFJQyxPQUFPLEdBQUc7WUFDaEQsU0FBVTtnQkFDUmIsYUFBYTtZQUNmO1FBQ0Y7UUFFQUc7SUFDRixHQUFHO1FBQUNaO0tBQWE7SUFFakIsTUFBTXVCLGdCQUFnQjtRQUNwQixJQUFJLENBQUNuQixnQkFBZ0IsQ0FBQ0UsY0FBYztZQUNsQ0ssU0FBUztZQUNUO1FBQ0Y7UUFFQSxNQUFNRSxXQUFXYixhQUFhYyxHQUFHLENBQUM7UUFDbEMsTUFBTVUsUUFBUSxtQkFBbUIsa0NBQWtDO1FBRW5FLE1BQU1DLFVBQVU7WUFDZFo7WUFDQWEsTUFBTXRCLGFBQWF1QixXQUFXLEdBQUdDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM5Q0MsTUFBTTtnQkFDSkMsV0FBV3hCO2dCQUNYeUIsU0FBUyxHQUFpQyxPQUE5QnpCLGFBQWFzQixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxLQUFvQyxPQUFqQyxDQUFDdEIsYUFBYXNCLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUssb0JBQW9CO1lBQ25HO1FBQ0Y7UUFFQSxJQUFJO1lBQ0YsTUFBTWIsV0FBVyxNQUFNQyxNQUFNLHlDQUF5QztnQkFDcEVnQixRQUFRO2dCQUNSQyxTQUFTO29CQUNQLGdCQUFnQjtvQkFDaEJDLGVBQWUsVUFBZ0IsT0FBTlY7Z0JBQzNCO2dCQUNBVyxNQUFNQyxLQUFLQyxTQUFTLENBQUNaO1lBQ3ZCO1lBRUEsSUFBSSxDQUFDVixTQUFTRSxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSUMsTUFBTTtZQUNsQjtZQUVBLE1BQU1DLE9BQU8sTUFBTUosU0FBU0ssSUFBSTtZQUNoQ2tCLE1BQU1uQixLQUFLRyxPQUFPLEdBQUcsMkJBQTJCO1lBQ2hEckIsT0FBT3NDLElBQUksQ0FBQztRQUNkLEVBQUUsT0FBT2xCLEtBQUs7WUFDWlYsU0FBU1UsZUFBZUgsUUFBUUcsSUFBSUMsT0FBTyxHQUFHO1FBQ2hEO0lBQ0Y7SUFFQSxJQUFJZCxXQUFXO1FBQ2IscUJBQ0UsOERBQUNnQztZQUFJQyxXQUFVO3NCQUNiLDRFQUFDRDtnQkFBSUMsV0FBVTswQkFDYiw0RUFBQ0M7b0JBQUVELFdBQVU7OEJBQWdDOzs7Ozs7Ozs7Ozs7Ozs7O0lBSXJEO0lBRUEsSUFBSS9CLE9BQU87UUFDVCxxQkFDRSw4REFBQzhCO1lBQUlDLFdBQVU7c0JBQ2IsNEVBQUNEO2dCQUFJQyxXQUFVOzBCQUNiLDRFQUFDQztvQkFBRUQsV0FBVTs4QkFBd0IvQjs7Ozs7Ozs7Ozs7Ozs7OztJQUk3QztJQUVBLHFCQUNFLDhEQUFDOEI7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNFO2dCQUFHRixXQUFVOzBCQUEwQjs7Ozs7OzBCQUV4Qyw4REFBQ0Q7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDbEQscURBQUlBO3dCQUFDa0QsV0FBVTs7MENBQ2QsOERBQUNoRCwyREFBVUE7MENBQ1QsNEVBQUNDLDBEQUFTQTs4Q0FBQzs7Ozs7Ozs7Ozs7MENBRWIsOERBQUNGLDREQUFXQTswQ0FDVFUsd0JBQVUsOERBQUNOLHVFQUFVQTtvQ0FBQ00sUUFBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQUluQyw4REFBQ1gscURBQUlBOzswQ0FDSCw4REFBQ0UsMkRBQVVBOzBDQUNULDRFQUFDQywwREFBU0E7OENBQUM7Ozs7Ozs7Ozs7OzBDQUViLDhEQUFDRiw0REFBV0E7O2tEQUNWLDhEQUFDRiw2REFBUUE7d0NBQ1BzRCxNQUFLO3dDQUNMQyxVQUFVekM7d0NBQ1YwQyxVQUFVekM7d0NBQ1ZvQyxXQUFVOzs7Ozs7a0RBRVosOERBQUM1QyxxRkFBY0E7d0NBQ2JrRCxPQUFPakQ7d0NBQ1BnRCxVQUFVdkM7Ozs7OztrREFFWiw4REFBQ1oseURBQU1BO3dDQUFDcUQsU0FBU3pCO3dDQUFla0IsV0FBVTtrREFBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUTdEO0dBdkl3QjFDOztRQUNEWCw0REFBZUE7UUFDckJDLHNEQUFTQTs7O0tBRkZVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9hcHBvaW50bWVudHMvcGFnZS50c3g/ZTZmYyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTZWFyY2hQYXJhbXMsIHVzZVJvdXRlciB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XG5pbXBvcnQgeyBDYWxlbmRhciB9IGZyb20gJ0AvY29tcG9uZW50cy91aS9jYWxlbmRhcic7XG5pbXBvcnQgeyBDYXJkLCBDYXJkQ29udGVudCwgQ2FyZEhlYWRlciwgQ2FyZFRpdGxlIH0gZnJvbSAnQC9jb21wb25lbnRzL3VpL2NhcmQnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnQC9jb21wb25lbnRzL3VpL2J1dHRvbic7XG5pbXBvcnQgeyBDbG9jayB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgdHlwZSB7IERvY3RvciB9IGZyb20gJ0AvYXBwL3R5cGVzJztcbmltcG9ydCB7IERvY3RvckNhcmQgfSBmcm9tICdAL2NvbXBvbmVudHMvZG9jdG9ycy9kb2N0b3ItY2FyZCc7XG5pbXBvcnQgeyBUaW1lU2xvdFBpY2tlciB9IGZyb20gJ0AvY29tcG9uZW50cy9hcHBvaW50bWVudHMvdGltZS1zbG90LXBpY2tlcic7XG5cbmNvbnN0IFRJTUVfU0xPVFMgPSBbJzA5OjAwJywgJzEwOjAwJywgJzExOjAwJywgJzE0OjAwJywgJzE1OjAwJywgJzE2OjAwJ10gYXMgY29uc3Q7XG5pbnRlcmZhY2UgVGltZVNsb3RQaWNrZXJQcm9wcyB7XG4gIHNsb3RzOiByZWFkb25seSBzdHJpbmdbXTtcbiAgb25TZWxlY3Q6ICh0aW1lOiBzdHJpbmcgfCBudWxsKSA9PiB2b2lkOyAvLyBBZGQgdGhlIG9uU2VsZWN0IHByb3Bcbn0gXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHBvaW50bWVudHNQYWdlKCkge1xuICBjb25zdCBzZWFyY2hQYXJhbXMgPSB1c2VTZWFyY2hQYXJhbXMoKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IFtkb2N0b3IsIHNldERvY3Rvcl0gPSB1c2VTdGF0ZTxEb2N0b3IgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkRGF0ZSwgc2V0U2VsZWN0ZWREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCB1bmRlZmluZWQ+KCk7XG4gIGNvbnN0IFtzZWxlY3RlZFRpbWUsIHNldFNlbGVjdGVkVGltZV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZmV0Y2hEb2N0b3IgPSBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBkb2N0b3JJZCA9IHNlYXJjaFBhcmFtcy5nZXQoJ2lkJyk7XG4gICAgICBpZiAoIWRvY3RvcklkKSB7XG4gICAgICAgIHNldEVycm9yKCdObyBkb2N0b3IgSUQgcHJvdmlkZWQnKTtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZG9jdG9yLyR7ZG9jdG9ySWR9YCk7XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIGRvY3RvciBkZXRhaWxzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBzZXREb2N0b3IoZGF0YS5kb2N0b3IpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnQW4gZXJyb3Igb2NjdXJyZWQnKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZldGNoRG9jdG9yKCk7XG4gIH0sIFtzZWFyY2hQYXJhbXNdKTtcblxuICBjb25zdCBoYW5kbGVCb29raW5nID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWREYXRlIHx8ICFzZWxlY3RlZFRpbWUpIHtcbiAgICAgIHNldEVycm9yKCdQbGVhc2Ugc2VsZWN0IGEgZGF0ZSBhbmQgdGltZSBzbG90LicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRvY3RvcklkID0gc2VhcmNoUGFyYW1zLmdldCgnaWQnKTtcbiAgICBjb25zdCB0b2tlbiA9ICd5b3VyLXRva2VuLWhlcmUnOyAvLyBSZXBsYWNlIHdpdGggYWN0dWFsIHRva2VuIGxvZ2ljXG5cbiAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgZG9jdG9ySWQsXG4gICAgICBkYXRlOiBzZWxlY3RlZERhdGUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLCAvLyBGb3JtYXQgYXMgWVlZWS1NTS1ERFxuICAgICAgc2xvdDoge1xuICAgICAgICBzdGFydFRpbWU6IHNlbGVjdGVkVGltZSxcbiAgICAgICAgZW5kVGltZTogYCR7c2VsZWN0ZWRUaW1lLnNwbGl0KCc6JylbMF19OiR7K3NlbGVjdGVkVGltZS5zcGxpdCgnOicpWzFdICsgMzB9YCAvLyBFbmQgdGltZSArMzAgbWluc1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9hcHBvaW50bWVudCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nsb3QgYWxyZWFkeSBib29rZWQuIFBsZWFzZSBzZWxlY3QgYSBkaWZmZXJlbnQgc2xvdC4nKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGFsZXJ0KGRhdGEubWVzc2FnZSk7IC8vIE9wdGlvbmFsIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgcm91dGVyLnB1c2goJy93YWxsZXQnKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIGJvb2sgYXBwb2ludG1lbnQuJyk7XG4gICAgfVxuICB9O1xuXG4gIGlmIChpc0xvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbXgtYXV0byBweS04XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWluLWgtWzQwMHB4XVwiPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGcgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+TG9hZGluZyBkb2N0b3IgZGV0YWlscy4uLjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIG14LWF1dG8gcHktOFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1pbi1oLVs0MDBweF1cIj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxnIHRleHQtcmVkLTUwMFwiPntlcnJvcn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbXgtYXV0byBweS04XCI+XG4gICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ib2xkIG1iLThcIj5Cb29rIGFuIEFwcG9pbnRtZW50PC9oMT5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0zIGdhcC02XCI+XG4gICAgICAgIDxDYXJkIGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTJcIj5cbiAgICAgICAgICA8Q2FyZEhlYWRlcj5cbiAgICAgICAgICAgIDxDYXJkVGl0bGU+RG9jdG9yIERldGFpbHM8L0NhcmRUaXRsZT5cbiAgICAgICAgICA8L0NhcmRIZWFkZXI+XG4gICAgICAgICAgPENhcmRDb250ZW50PlxuICAgICAgICAgICAge2RvY3RvciAmJiA8RG9jdG9yQ2FyZCBkb2N0b3I9e2RvY3Rvcn0gLz59XG4gICAgICAgICAgPC9DYXJkQ29udGVudD5cbiAgICAgICAgPC9DYXJkPlxuXG4gICAgICAgIDxDYXJkPlxuICAgICAgICAgIDxDYXJkSGVhZGVyPlxuICAgICAgICAgICAgPENhcmRUaXRsZT5TZWxlY3QgRGF0ZSAmIFRpbWU8L0NhcmRUaXRsZT5cbiAgICAgICAgICA8L0NhcmRIZWFkZXI+XG4gICAgICAgICAgPENhcmRDb250ZW50PlxuICAgICAgICAgICAgPENhbGVuZGFyXG4gICAgICAgICAgICAgIG1vZGU9XCJzaW5nbGVcIlxuICAgICAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0ZWREYXRlfVxuICAgICAgICAgICAgICBvblNlbGVjdD17c2V0U2VsZWN0ZWREYXRlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtYi00XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8VGltZVNsb3RQaWNrZXJcbiAgICAgICAgICAgICAgc2xvdHM9e1RJTUVfU0xPVFN9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXtzZXRTZWxlY3RlZFRpbWV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVCb29raW5nfSBjbGFzc05hbWU9XCJtdC00XCI+XG4gICAgICAgICAgICAgIEJvb2sgQXBwb2ludG1lbnRcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvQ2FyZENvbnRlbnQ+XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlU2VhcmNoUGFyYW1zIiwidXNlUm91dGVyIiwiQ2FsZW5kYXIiLCJDYXJkIiwiQ2FyZENvbnRlbnQiLCJDYXJkSGVhZGVyIiwiQ2FyZFRpdGxlIiwiQnV0dG9uIiwiRG9jdG9yQ2FyZCIsIlRpbWVTbG90UGlja2VyIiwiVElNRV9TTE9UUyIsIkFwcG9pbnRtZW50c1BhZ2UiLCJzZWFyY2hQYXJhbXMiLCJyb3V0ZXIiLCJkb2N0b3IiLCJzZXREb2N0b3IiLCJzZWxlY3RlZERhdGUiLCJzZXRTZWxlY3RlZERhdGUiLCJzZWxlY3RlZFRpbWUiLCJzZXRTZWxlY3RlZFRpbWUiLCJpc0xvYWRpbmciLCJzZXRJc0xvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwiZmV0Y2hEb2N0b3IiLCJkb2N0b3JJZCIsImdldCIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwiZGF0YSIsImpzb24iLCJlcnIiLCJtZXNzYWdlIiwiaGFuZGxlQm9va2luZyIsInRva2VuIiwicGF5bG9hZCIsImRhdGUiLCJ0b0lTT1N0cmluZyIsInNwbGl0Iiwic2xvdCIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJtZXRob2QiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiYWxlcnQiLCJwdXNoIiwiZGl2IiwiY2xhc3NOYW1lIiwicCIsImgxIiwibW9kZSIsInNlbGVjdGVkIiwib25TZWxlY3QiLCJzbG90cyIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/appointments/page.tsx\n"));

/***/ })

});