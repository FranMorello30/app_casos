/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApexOptions } from 'ng-apexcharts';
import Swal from 'sweetalert2';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ConfiguracionService } from '../../services/configuracion.service';
@Component({
    selector: 'cierre',
    templateUrl: './cierre.component.html',
    styles: [],
})
export class CierreComponent implements OnInit {
    data: any;
    chartGithubIssues: ApexOptions = {};
    chartTaskDistribution: ApexOptions = {};
    chartBudgetDistribution: ApexOptions = {};
    chartWeeklyExpenses: ApexOptions = {};
    chartMonthlyExpenses: ApexOptions = {};
    chartYearlyExpenses: ApexOptions = {};
    constructor(
        private readonly _router: Router,
        private readonly _fuseConfirmationService: FuseConfirmationService,
        private readonly _configService: ConfiguracionService
    ) {}

    ngOnInit(): void {
        this.data = {
            githubIssues: {
                overview: {
                    'this-week': {
                        'new-issues': 214,
                        'closed-issues': 75,
                    },
                    'last-week': {
                        'new-issues': 197,
                        'closed-issues': 72,
                    },
                },
                labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
                series: {
                    'this-week': [
                        {
                            name: 'Creados',
                            type: 'line',
                            data: [42, 28, 43, 34, 20, 25, 22],
                        },
                        {
                            name: 'Cerrados',
                            type: 'column',
                            data: [11, 10, 8, 11, 8, 10, 17],
                        },
                    ],
                    'last-week': [
                        {
                            name: 'Creados',
                            type: 'line',
                            data: [37, 32, 39, 27, 18, 24, 20],
                        },
                        {
                            name: 'Cerrados',
                            type: 'column',
                            data: [9, 8, 10, 12, 7, 11, 15],
                        },
                    ],
                },
            },
        };
        this._prepareChartData();
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                },
            },
        };

        console.log(this.nroSemana(new Date()));
    }
    realizarCierre(): void {
        const opciones: any = {
            title: 'Realizar cierre',
            message:
                'Esta seguro de hacer cierre? <span class="font-medium">Esta acción no puede deshacerse!</span>',
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Cerrar',
                    color: 'warn',
                },
                cancel: {
                    show: true,
                    label: 'Cancelar',
                },
            },
            dismissible: true,
        };
        const dialogRef = this._fuseConfirmationService.open(opciones);
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                console.log('cerrado');
                this._configService.cierreSistema().subscribe((resp) => {
                    const ventanaToast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener(
                                'mouseenter',
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                'mouseleave',
                                Swal.resumeTimer
                            );
                        },
                    });

                    ventanaToast.fire({
                        icon: 'success',
                        title: resp,
                    });
                });
            }
        });
    }
    nroSemana(fecha: Date): number {
        const DIA_EN_MILISEGUNDOS = 1000 * 60 * 60 * 24;
        const DIAS_QUE_TIENE_UNA_SEMANA = 7;
        const JUEVES = 4;
        fecha = new Date(
            Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())
        );
        let diaDeLaSemana = fecha.getUTCDay(); // Domingo es 0, sábado es 6
        if (diaDeLaSemana === 0) {
            diaDeLaSemana = 7;
        }
        fecha.setUTCDate(fecha.getUTCDate() - diaDeLaSemana + JUEVES);
        const inicioDelAño = new Date(Date.UTC(fecha.getUTCFullYear(), 0, 1));
        const diferenciaDeFechasEnMilisegundos =
            fecha.getTime() - inicioDelAño.getTime();
        return Math.ceil(
            (diferenciaDeFechasEnMilisegundos / DIA_EN_MILISEGUNDOS + 1) /
                DIAS_QUE_TIENE_UNA_SEMANA
        );
    }
    private _fixSvgFill(element: Element): void {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter((el) => el.getAttribute('fill').indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute(
                    'fill',
                    `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`
                );
            });
    }
    private _prepareChartData(): void {
        // Github issues
        this.chartGithubIssues = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            colors: ['#3730A3', '#166534'],
            dataLabels: {
                enabled: true,
                enabledOnSeries: [0],
                background: {
                    borderWidth: 0,
                },
            },
            grid: {
                borderColor: 'var(--fuse-border)',
            },
            labels: this.data.githubIssues.labels,
            legend: {
                show: false,
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%',
                },
            },
            series: this.data.githubIssues.series,
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75,
                    },
                },
            },
            stroke: {
                width: [3, 0],
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    color: 'var(--fuse-border)',
                },
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
                tooltip: {
                    enabled: false,
                },
            },
            yaxis: {
                labels: {
                    offsetX: -16,
                    style: {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
            },
        };
    }
}
