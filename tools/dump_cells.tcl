# Dump every placed instance: name, master, x, y, w, h (um) and the die box.
read_db $::env(ODB)
set block [ord::get_db_block]
set dbu [$block getDefUnits]
set f [open $::env(OUT) w]
set die [$block getDieArea]
puts $f "#die [expr {[$die xMin]/double($dbu)}] [expr {[$die yMin]/double($dbu)}] [expr {[$die xMax]/double($dbu)}] [expr {[$die yMax]/double($dbu)}]"
foreach inst [$block getInsts] {
  set m [$inst getMaster]
  set bb [$inst getBBox]
  puts $f "[$inst getName] [$m getName] [expr {[$bb xMin]/double($dbu)}] [expr {[$bb yMin]/double($dbu)}] [expr {([$bb xMax]-[$bb xMin])/double($dbu)}] [expr {([$bb yMax]-[$bb yMin])/double($dbu)}]"
}
close $f
