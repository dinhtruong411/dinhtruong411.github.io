#!/usr/bin/ruby

#------------------------------------------------------------------------------
# Exp application of Team_Manager class.
#------------------------------------------------------------------------------
# Tab with 2 spaces
#------------------------------------------------------------------------------

load 'team_manager.rb'
# Name list
names_hash = { 'Leader'         => 'Pham Dinh Truong', \
               'Deputy Leader'  => 'Dang Thi Hoa', \
               'Member1'        => 'Nguyen Thi Van', \
               'Member2'        => 'Trinh Thi Tuyet Diem', \
               'Member3'        => 'Nguyen Thi Hong Van'
             }

# Date of birth list
dobs_array = ['13/02/1993', '19/11/1992', '02/10/1992', '12/05/1993', \
              '09/08/1993']

project_team = Team_Manager.new(names_hash, dobs_array)
project_team.add_member('Vo Thi Tuyet', '18/08/1993')
project_team.search_by_position('member')
project_team.search_by_name('van')
project_team.export('team_list')
project_team.add_member('Vo Thi Tuyet1', '10/59/1993')
project_team.add_member('Vo Thi Tuyet2', '10/01/1yy3')
project_team.add_member('Vo Thi Tuyet3', '29/02/1993')
project_team.add_member('Vo Thi Tuyet4', '31/04/1993')
