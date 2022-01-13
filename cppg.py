import time
import sys
import os
import copy
import shutil
from PIL import Image
from werkzeug import datastructures
import numpy as np
import cv2
import pickle
global One_freqItems
global f
global scp
global cp_data
from bitarray import bitarray
class cppg():
    def __init__(self, minRF, minCS, maxOR, inpfile, outfile,datasetname,fsubgraphs_data):
        global f
        global scp
        global cp_data
        self.minRF = float(minRF)
        self.minCS = float(minCS)
        self.minCS1=minCS
        self.maxOR = float(maxOR)
        self.inpfile = inpfile
        self.outfile = outfile
        self.nots = self.getlines(inpfile)
        self.dataset=datasetname
        self.fsubgraphs_data=fsubgraphs_data
        #self.fout = open(outfile,'w')
        self.NOk = []
        self.frequencies=[]
        self.noofSCP=0
        self.flist=[]
        [self.items, self.database] = self.dbscan(inpfile)
        self.coverages=[]
        self.database_dict=self.bitstrings(self.database) #Assigning bit strings for items 
        print("items")
        print(self.items.items())
        sorteditems = sorted(self.items.items(), key = lambda a: (-a[1],a[0]))
        
        mintracs = float(self.minRF) * 1.0 * float(self.nots)

        #Finding frequent items based on number of 1s in bitstrings of items
        minrf_satisfying_items=[[i,self.database_dict[i].count(1)] for i in self.database_dict if self.database_dict[i].count(1)>=mintracs]
        print("minrf_satisfying_items")
        print(minrf_satisfying_items)
        #Constructing flist
        self.flist=[i[0] for i in sorted(minrf_satisfying_items,key=lambda x:[x[1],-int(x[0])],reverse=True)]
        print("flist",self.flist)
        print("before",self.database)
        #Arranging the items in databse in flist order as well as removing items which are not frequent
        for i in range(len(self.database)):
            temp_list_of_removing_items=[]
            for j in range(len(self.database[i])):
                if(self.database[i][j] not in self.flist):
                    #self.database[i].pop(j)
                    temp_list_of_removing_items.append(self.database[i][j])
            for k in temp_list_of_removing_items:
            	self.database[i].remove(k)
            self.database[i].sort(key=lambda x:[self.database_dict[x].count(1),-int(x)],reverse=True)
        print("after",self.database)
         
           
        freqitems = filter(lambda x: (x[1] >= mintracs), sorteditems)
        #print("freqitems",freqitems)
       	length=0
        #print(sorted([i[0] for i in freqitems]))
        one_size_coverage=[]
        one_size_coverage_items=[[i[0],self.database_dict[i[0]].count(1)] for i in minrf_satisfying_items if self.database_dict[i[0]].count(1)>=self.minCS*self.nots]
        print("one_size_coverage_items",one_size_coverage_items)

        #one_size_coverage = filter(lambda x: (x[1] >= self.minCS*self.nots),freqitems)
        f=open("./"+datasetname+"_"+str(self.minCS1)+"_"+str(self.minRF)+"_"+str(self.maxOR),'w')
        f.write("Coverage"+" "+"1"+'\n')
        f.write('\n')
        for i in one_size_coverage_items:
        	length=length+1
        flist_passing=list()
        for i in self.flist:
            flist_passing.append([i])
        for i in range(len(flist_passing)):
            self.recursivemine(flist_passing[i])
        #print(type(flist_passing))
        #print("coverages")
        #print(len(self.coverages))
        '''for i in sorteditems:
            print(i)
            print(i[1]>=mintracs)
            if(i[1]>=mintracs):
                
                freqitems.append(i)
        
        freqitems = filter(lambda x: (x[1] >= mintracs), sorteditems)
        print(freqitems)
        one_size_coverage = filter(lambda x: (x[1] >= minCS*self.nots),freqitems)
        one_size_coverage=[]
        c=[]'''
        one_size_coverage=[]
        count=1
        for i in range(0,length):
            self.noofSCP=self.noofSCP+1
            one_size_coverage.append(one_size_coverage_items[i][0])
            f.write("i"+" "+str(self.noofSCP)+'\n')
            f.write("cs"+" "+str(float(one_size_coverage_items[i][1])/float(self.nots))+'\n')
            f.write("or"+" "+str(self.maxOR)+'\n')
            count=count+1
            f.write('\n')
        f.write('\n')
        f.write('\n')
        '''print("one_size_coverage")'''
        self.source_dir="./"+datasetname+"data_2_"+str(float(self.minRF))
        self.dest_dir="./scp_images_"+datasetname+"_"+str(self.minCS1)
        self.freqitems = map(lambda x: x[0], freqitems)  
        #self.noofFreqItems=copy.copy(len(list(self.freqitems)))
        
        for l in self.freqitems:
            '''print("fe")'''
            self.NOk.append([l])
        '''print(self.NOk)'''
        outputfile="./scp_images_"+datasetname+"_"+str(self.minCS1)
        if(os.path.exists(outputfile)):
            shutil.rmtree(outputfile)
        os.mkdir(outputfile)
        if(length!=0):
            if(os.path.exists(outputfile+"/Coverage_1")):
                shutil.rmtree(outputfile+"/Coverage_1")
            os.mkdir(outputfile+"/Coverage_1")
        
        cp_data=[]
        #print("frequent")
        for i in range(0,length):
            #print(one_size_coverage[i][0])

            shutil.copy(self.source_dir+"/"+str(one_size_coverage[i][0])+".png",self.dest_dir+"/Coverage_1/")

            #self.fout.write("['"+str(i[0])+"']\n")
       
       
    def get_overlapratio_cs(self, pattern):
        ovr_nume_1=set()
        for i in pattern[:-1]:
            for j in range(len(self.database)):
                if i in self.database[j]:
                    ovr_nume_1.add(j)
        ovr_deno = set()
        for j in range(len(self.database)):
            if pattern[-1] in self.database[j]:
                ovr_deno.add(j)
        cs_nume = ovr_nume_1.union(ovr_deno)
        ovr_nume = ovr_nume_1.intersection(ovr_deno)
        # print ovr_nume,ovr_deno,ovr_nume_1
        return len(ovr_nume)*1.0/len(ovr_deno),len(cs_nume)*1.0/self.nots

    def expand(self):
        global f
        global scp
        global cp_data
        cnt = 0
        cnt1 = 0
        length = 1
        coverage=2
        self.source_dir="./"+datasetname+"data_2_"+str(float(minRF))
        self.dest_dir="./scp_images_"+datasetname+"_"+str(self.minCS1)
        while len(self.NOk)>0:
            if(os.path.exists(self.dest_dir+"/Coverage_"+str(coverage))):
                shutil.rmtree(self.dest_dir+"/Coverage_"+str(coverage))
            f.write("Coverage"+" "+str(coverage)+'\n')
            f.write('\n')
            temp_NOk = self.NOk
            
            self.NOk = []
            count=1
            if(len(temp_NOk)!=0):
                coverage_n={"coverage":coverage,"graphs":[]}
            for i in range(len(temp_NOk)):
                c=[]
                for j in range(i+1, len(temp_NOk)):
                    cnt += 1
                    if temp_NOk[i][:-1] == temp_NOk[j][:-1]:
                        cnt1 += 1
                        newpattern = temp_NOk[i] + [temp_NOk[j][-1]]
                       
                        # print "newpattern",newpattern
                        overlapratio,cs = self.get_overlapratio_cs(newpattern)
                        # print newpattern,overlapratio,cs
                        if float(overlapratio) <= float(self.maxOR):
                            self.NOk.append(newpattern)
                           
                            if float(cs) >= float(self.minCS):
                                if(not os.path.exists(self.dest_dir+"/Coverage_"+str(coverage))):
                                    os.mkdir(self.dest_dir+"/Coverage_"+str(coverage))
                                self.noofSCP=self.noofSCP+1
                                
                                f.write("i"+" "+str(self.noofSCP)+'\n')
                                f.write("cs"+" "+str(round(float(cs),2))+'\n')
                                f.write("or"+" "+str(overlapratio)+'\n')
                                f.write('\n')
                                opened_images=[]
                                h={"or":str(overlapratio),"cs":str(round(float(cs),2)),"size":len(newpattern),"graphs":[]}
                                #print("pj")
                                for k in newpattern:
                                    '''print("true")'''
                                    print(k)
                                    h["graphs"].append(fsubgraphs_data[int(k)-1])
                                    opened_images.append(cv2.imread(self.source_dir+"/"+str(k)+".png"))
                                h_min = min(img.shape[0] for img in opened_images)
                                cp_data.append(h)
                                '''widths,heights=zip(*(k.size for k in opened_images))
                                total_width=sum(widths)
                                max_height=max(heights)
                                new_img = np.zeros(shape=(max_height, total_width, 3))
                                new_image=Image.new('RGB',(total_width,max_height))
                                x_offset=0
                                for k in opened_images:
                                    new_image.paste(k,(x_offset,0))
                                    x_offset=x_offset+k.size[0]'''
                                im_list_resize = [cv2.resize(img,(int(img.shape[1] * h_min / img.shape[0]),h_min), interpolation=cv2.INTER_CUBIC) for img in opened_images]
                                new_image=cv2.hconcat(im_list_resize)
                                cv2.imwrite(self.dest_dir+"/Coverage_"+str(coverage)+"/"+str(count)+".png",new_image)
                                '''new_image.save(self.dest_dir+"/Coverage_"+str(coverage)+"/"+str(count)+".png")'''
                               
                                count=count+1
                                # print "This is coverage pattern",newpattern,cs,overlapratio
                                #self.fout.write(str(newpattern)+"\n")
                    else:
                        break
                self.frequencies.append(c)
            length += 1
            
            f.write('\n')
            f.write('\n')
            coverage=coverage+1
        '''print("total read, total calculate_or_cs",cnt,cnt1)'''
        #self.fout.close()
        f.close()
        return cnt1,self.noofSCP


    def bitstrings(self,database):
        dict_of_items={}
        for i in range(len(database)):
            for j in range(len(database[i])):
                if(database[i][j] in dict_of_items):
                    dict_of_items[database[i][j]][i]=1
                else:
                    dict_of_items[database[i][j]]=bitarray(len(database))
                    dict_of_items[database[i][j]].setall(0)
                    dict_of_items[database[i][j]][i]=1
        print(dict_of_items)
        return dict_of_items
    '''def recursivemine(self,fl):
        for i in range(len(fl)):
            print("flist is",type(fl[i]))
            projected_database=set()
            self.project_database(fl[i],projected_database)
            cs=bitarray(len(self.database))
            cs.setall(0)
            overlap=bitarray(len(self.database))
            overlap.setall(1)
            for j in fl[i]:
                print("j is ",j)
                print(self.database_dict[j])
                cs=cs | self.database_dict[j]
                print("cs",cs)
                overlap=overlap & self.database_dict[j]
                print("overlap",overlap)
            if(len(projected_database)==0):
                return
            else:
                for j in projected_database:
                    cs_till=cs | self.database_dict[j]
                    overlap_till=overlap & self.database_dict[j]
                    print("cs_till,mincs",cs_till.count(1),self.minCS*self.nots)
                    print("overlap_till,maxor",overlap_till.count(1),self.maxOR*self.nots)
                    print("fl[i] is",fl[i])
                    fl[i].append(j)
                    if(cs_till.count(1)>=self.minCS*self.nots and overlap_till.count(1)<=self.maxOR*self.nots):
                        self.coverages.append(fl[i])
                    return self.recursivemine(fl[i])'''
                
    
    def recursivemine(self,flist):
        #print(flist)
        

        projected_database=set()
        self.project_database(flist,projected_database)
        #print("projected_databse",projected_database)
        if(len(projected_database)==0):
            return
        else:
            for j in projected_database:
                c=[]
                for k in flist:
                    c.append(k)
                c.append(j)
                #print("next_list",c)
                cs=bitarray(len(self.database))
                cs.setall(0)
                over=bitarray(len(self.database))
                over.setall(1)
                for i in c:
                    cs=cs | self.database_dict[i]
                    over=over & self.database_dict[i]
                #print(cs,over.count(1)/self.database_dict[j].count(1))
                if(cs.count(1)>=self.minCS*self.nots and float(over.count(1)/self.database_dict[j].count(1))<=self.maxOR):
                    #print("Adding",c)
                    self.coverages.append(c)
                    self.recursivemine(c)
                    #print("returned")
            




                
    def project_database(self,items,projected_database):
        #print(items)
        for i in range(len(self.database)):
            if(len(set(self.database[i]).intersection(set(items)))==0):
                c=[]
                for j in range(len(self.database[i])):
                    if(self.flist.index(self.database[i][j])>=self.flist.index(items[-1])):
                        projected_database.add(self.database[i][j])
        
          
    def dbscan(self,inputfile):
        f=open(inputfile,'r')
        a = {}
        database = []
        for row in f:
            row = row.rstrip('\n')
            row = row.split(" ")
            if len(row[-1]) == 0:
                row.pop()
            database.append(row)
            for j in row:
                if j in a:
                    a[j] += 1
                else:
                    a[j] = 1
        return [a,database]

    def getlines(self,filename):
        with open(filename,"r") as f:
            ''''return sum(1 for _ in f)'''
            a=0
            for i in f:
                if i.strip():
                    a=a+1
            return a
t1 = time.time()
minRF = float(sys.argv[1])
minCS =sys.argv[2]
maxOR = float(sys.argv[3])
datasetname = sys.argv[4]
with open('result.txt','rb') as fp:
    fsubgraphs_data=pickle.load(fp)
    print(type(fsubgraphs_data))
inpfile = "./2_"+str(minRF)+"_"+datasetname+"Flat_tra.txt"
#datasetname = "graph5_test2.txt"
#filepath = "C:\\Users\\user\\Documents\\CoverageGraph\\dataset1\\GraphData\\"
outfile = "Results.txt"
'''print(outfile)'''
obj=cppg(minRF, minCS, maxOR, inpfile, outfile,datasetname,fsubgraphs_data)
t3=time.time()
print( "data read",str(t3-t1))
candidate_patterns,SCPs = obj.expand()
t2 = time.time()
print(cp_data)
with open("cp_result.txt","wb") as f:
    pickle.dump(cp_data,f)
f.close()
print( "process done",str(t2-t1))
f = open("./Results.txt",'w')
f.write("execution_time:"+str(t2-t1)+'\n')
f.write("Number of Candidate Patterns:"+str(candidate_patterns)+'\n')
f.write("Number of Coverage Patterns:"+str(SCPs)+'\n')
f.close()