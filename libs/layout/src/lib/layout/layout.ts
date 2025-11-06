import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {Sidebar} from "../sidebar/sidebar";

@Component({
  selector: "tt-layout",
  imports: [RouterOutlet, Sidebar],
  templateUrl: "./layout.html",
  styleUrl: "./layout.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout {}
