import { Component, inject } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { StatisticsService } from '../../../services/statistics.service';
import { AcceptedApplicationLoanValueResponse, ApplicationMonthlyCountResponse, ApplicationStatusCountResponse, HighRiskMonthlyCountResponse } from '../../../types';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NgxEchartsDirective, AsyncPipe],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  private service = inject(StatisticsService);

  applicationStatusData: ApplicationStatusCountResponse | undefined;
  monthlyGraphData: number[] = [];
  totalLoanValue$: Observable<AcceptedApplicationLoanValueResponse> = this.service.getYearlyAcceptedApplicationLoanValue();
  numberOfNewCustomers$: Observable<ApplicationMonthlyCountResponse> = this.service.getNewCustomerCount();
  numberOfHighRiskApplications$: Observable<HighRiskMonthlyCountResponse> = this.service.getHighRiskApplicationCount();

  pieChartOption: EChartsOption | undefined;
  lineChartOption: EChartsOption | undefined;

  currentDate = new Date();
  daysOfCurrentMonth = this.getDaysInMonth(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);

  ngOnInit(): void {
    this.service.getAllApplicationStatusCount().subscribe({
      next: data => {
        this.applicationStatusData = data
        this.pieChartOption = {
          legend: {
            orient: 'horizontal',
            align: 'auto',
            data: ['Accepted', 'Rejected', 'Pending', 'New']
          },
          series: [
            {
              type: 'pie',
              label: {
                show: false,
                position: 'center'
              },
              labelLine: {
                show: false
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '16',
                  formatter: '{b}: {c}',
                  backgroundColor: 'white',
                  borderColor: 'inherit',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5
                }
              },
              data: [
                { value: this.applicationStatusData!.newCount, name: 'New' },
                { value: this.applicationStatusData!.acceptedCount, name: 'Accepted' },
                { value: this.applicationStatusData!.pendingCount, name: 'Pending' },
                { value: this.applicationStatusData!.rejectedCount, name: 'Rejected' },
              ],
              radius: ['40%', '70%']
            }
          ]
        };
      },
      error: err => console.error(err)
    });

    this.service.getApplicationCountCurrentMonth().subscribe({
      next: (data) => {
        for (let i = 0; i < this.currentDate.getDate(); i++) {
          this.monthlyGraphData?.push(data[i].applicationCount)
        }
        this.lineChartOption = {
          xAxis: {
            type: 'category',
            data: this.daysOfCurrentMonth,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: this.monthlyGraphData,
              type: 'line',
            },
          ],
        };
      },
      error: (error) => console.error(error)
    })
  }

  calculateDifference(current: number, previous: number) {
    return Math.round((current - previous) / previous * 100);
  }

  getDaysInMonth(year: number, month: number): string[] {
    const numDays = new Date(year, month, 0).getDate();
    return Array.from({ length: numDays }, (_, index) => month + "/" + (index + 1));
  }
}